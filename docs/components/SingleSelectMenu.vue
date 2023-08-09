<template>
  <div data-name="container" :class="getClasses('container')" @click="handleClickOutside">
    <div data-name="header" @click.stop="toggle()" :class="getClasses('header')">
      <label data-name="headerLabel" :class="getClasses('headerLabel')">
        {{ itemValue(selectedItem) || placeholder }}
      </label>
      <template v-if="!display">
        <button
          data-name="collapsedIcon"
          v-if="firstIcon"
          v-html="firstIcon"
          :class="getClasses('collapsedIcon')"
        ></button>
        <button data-name="collapsedIcon" v-else :class="getClasses('collapsedIcon')">
          <svg
            data-name="collapsedIconSvg"
            xmlns="http://www.w3.org/2000/svg"
            :class="getClasses('collapsedIconSvg')"
            height="48"
            width="48"
            viewBox="0 0 48 48"
          >
            <path
              data-name="collapsedIconPath"
              :class="getClasses('collapsedIconPath')"
              d="m24 30.8-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
            />
          </svg>
        </button>
      </template>

      <template v-else>
        <button
          data-name="expandedIcon"
          v-if="secondIcon"
          v-html="secondIcon"
          :class="getClasses('expandedIcon')"
        ></button>
        <button data-name="expandedIcon" v-else :class="getClasses('expandedIcon')">
          <svg
            data-name="expandedIconSvg"
            xmlns="http://www.w3.org/2000/svg"
            :class="getClasses('expandedIconSvg')"
            height="48"
            width="48"
            viewBox="0 0 48 48"
          >
            <path
              data-name="expandedIconPath"
              :class="getClasses('expandedIconPath')"
              d="M14.15 30.15 12 28l12-12 12 12-2.15 2.15L24 20.3Z"
            />
          </svg>
        </button>
      </template>
    </div>

    <div data-name="menu" v-if="display" :class="getClasses('menu')">
      <ul data-name="menuList" :class="getClasses('menuList')">
        <li
          :data-name="`menuItem ${item == selectedItem ? 'selectedMenuItem' : ''}`"
          v-for="item of items"
          :class="[
            getClasses('menuItem'),
            `${isEqualToSelected(item) ? getClasses('selectedMenuItem') : ''}`,
          ]"
          @click.stop="select(item)"
        >
          {{ itemValue(item) }}
        </li>
      </ul>
      <div data-name="noItems" v-if="!items.length" :class="getClasses('noItems')">
        {{ noItemsPlaceholder }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

const defaultClasses = {
  container: {
    addClasses: "",
    width: "w-full",
    position: "relative",
  },
  header: {
    addClasses: "",
    display: "flex",
    gap: "gap-1",
    width: "w-full",
    cursor: "cursor-pointer",
    justifyContent: "justify-between",
    borderRadius: "rounded-md",
    backgroundColor: "bg-white",
    padding: "px-4 py-2",
    fontSize: "text-sm",
    boxShadow: "shadow-sm",
    hover: "hover:bg-gray-50",
  },
  headerLabel: {
    addClasses: "",
    textOverflow: "truncate",
  },
  collapsedIcon: {
    addClasses: "",
    height: "h-5",
    width: "w-5",
    minWidth: "min-w-[1.25rem]",
  },
  collapsedIconSvg: {
    addClasses: "",
    width: "w-full",
    height: "h-full",
  },
  collapsedIconPath: {
    addClasses: "",
    fill: "fill-slate-600",
  },
  expandedIcon: {
    addClasses: "",
    height: "h-5",
    width: "w-5",
    minWidth: "min-w-[1.25rem]",
  },
  expandedIconSvg: {
    addClasses: "",
    width: "w-full",
    height: "h-full",
  },
  expandedIconPath: {
    addClasses: "",
    fill: "fill-slate-600",
  },
  menu: {
    addClasses: "",
    position: "absolute",
    left: "left-0",
    right: "right-0",
    zIndex: "z-10",
    margin: "mt-1",
    maxHeight: "max-h-72",
    overflow: "overflow-auto",
    borderRadius: "rounded-md",
    backgroundColor: "bg-white",
    padding: "py-1",
    shadowBox: "shadow-md",
  },
  menuList: {
    addClasses: "",
  },
  menuItem: {
    addClasses: "",
    pointer: "cursor-pointer",
    padding: "px-4 py-2",
    fontSize: "text-sm",
    hover: "hover:bg-slate-100 hover:text-slate-900",
  },
  selectedMenuItem: {
    addClasses: "",
    backgroundColor: "bg-slate-100",
    fontWeight: "font-semibold",
  },
  noItems: {
    addClasses: "",
    padding: "px-4 py-2",
    fontSize: "text-sm",
  },
};

type NestedPartial<T> = {
  [key in keyof T]?: Partial<T[key]>;
};

export type Item = string | { id: number | string; value: any };

const SELECT_ITEM_EVENT = "select-item";

export default defineComponent({
  props: {
    classes: {
      type: Object as () => NestedPartial<typeof defaultClasses>,
      default: defaultClasses,
    },

    items: {
      type: Object as () => Item[],
      required: true,
    },

    selected: {
      type: Object as () => Item,
      required: false,
    },

    placeholder: {
      type: String,
      default: "Select",
    },

    noItemsPlaceholder: {
      type: String,
      default: "No items",
    },

    required: {
      type: Boolean,
      default: false,
    },

    eager: {
      type: Boolean,
      required: false,
    },

    firstIcon: {
      type: String,
      required: false,
    },

    secondIcon: {
      type: String,
      required: false,
    },
  },

  emits: [SELECT_ITEM_EVENT],

  data() {
    return {
      defaultClasses: defaultClasses,
      display: false,
      selectedItem: this.selected || null,
    };
  },

  mounted() {
    if (this.eager) this.$emit(SELECT_ITEM_EVENT, this.selectedItem);
    document.addEventListener("click", this.handleClickOutside);
  },

  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    // external api
    select(item: Item | null, emit = true) {
      if (this.required) {
        this.selectedItem = item;
      } else {
        this.selectedItem = this.isEqualToSelected(item) ? null : item;
      }
      this.display = false;
      if (emit) this.$emit(SELECT_ITEM_EVENT, this.selectedItem);
    },

    getClasses(elementName: keyof typeof this.defaultClasses): string {
      const classes = this.classes[elementName] || {};
      return Object.values({
        ...this.defaultClasses[elementName],
        ...classes,
      }).join(" ");
    },

    handleClickOutside(event: MouseEvent) {
      if (!this.$el.contains(event.target)) {
        this.display = false;
      }
    },

    toggle() {
      this.display = !this.display;
    },

    itemValue(item: Item | null) {
      return typeof item == "object" && item != null ? item.value : item;
    },

    isEqualToSelected(item: Item | null) {
      if (item === null || typeof item == "string") return item == this.selectedItem;
      if (typeof this.selectedItem == "object") return item.id == this.selectedItem?.id;
      return false;
    },
  },
});
</script>
