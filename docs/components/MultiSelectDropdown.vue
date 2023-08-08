<template>
  <div data-name="container" :class="getClasses('container')">
    <div data-name="header" :class="getClasses('header')" @click="toggle()">
      <div data-name="headerBox" :class="getClasses('headerBox')">
        <template v-if="selectedItems.length">
          <div
            data-name="headerChipSection"
            v-if="headerMode == HeaderMode.CHIP"
            :class="getClasses('headerChipSection')"
          >
            <div
              data-name="headerChip"
              :class="getClasses('headerChip')"
              v-for="item of selectedItems"
            >
              <span
                data-name="headerChipContent"
                :class="getClasses('headerChipContent')"
                >{{ itemValue(item) }}</span
              >

              <button
                v-if="headerChipRemoveIcon"
                data-name="headerChipRemoveIcon"
                :class="getClasses('headerChipRemoveIcon')"
                @click.stop="remove(item)"
                v-html="headerChipRemoveIcon"
              ></button>
              <button
                v-else
                data-name="headerChipRemoveIcon"
                :class="getClasses('headerChipRemoveIcon')"
                @click.stop="remove(item)"
              >
                <svg
                  data-name="headerChipRemoveIconSvg"
                  :class="getClasses('headerChipRemoveIconSvg')"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path
                    data-name="headerChipRemoveIconPath"
                    :class="getClasses('headerChipRemoveIconPath')"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <label
            v-else-if="headerMode == HeaderMode.TEXT"
            data-name="headerLabel"
            :class="getClasses('headerLabel')"
          >
            <template v-if="selectedItems.length">{{
              selectedItems.join(textItemSeparator)
            }}</template>
          </label>
        </template>

        <label v-else data-name="headerLabel" :class="getClasses('headerLabel')">
          {{ placeholder }}
        </label>
      </div>

      <button
        v-if="!display"
        data-name="collapsedIcon"
        :class="getClasses('collapsedIcon')"
      >
        <svg
          data-name="collapsedIconSvg"
          :class="getClasses('collapsedIconSvg')"
          xmlns="http://www.w3.org/2000/svg"
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
      <button v-else data-name="expandedIcon" :class="getClasses('expandedIcon')">
        <svg
          data-name="expandedIconSvg"
          :class="getClasses('expandedIconSvg')"
          xmlns="http://www.w3.org/2000/svg"
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
    </div>

    <ul data-name="menu" :class="getClasses('menu')" v-if="display">
      <div
        data-name="menuChipSection"
        :class="getClasses('menuChipSection')"
        v-if="selectedItems.length && showMenuChipSection"
      >
        <div
          data-name="menuChip"
          :class="getClasses('menuChip')"
          v-for="item of selectedItems"
        >
          <span data-name="menuChipContent" :class="getClasses('menuChipContent')">{{
            itemValue(item)
          }}</span>

          <button
            v-if="menuChipRemoveIcon"
            data-name="menuChipRemoveIcon"
            :class="getClasses('menuChipRemoveIcon')"
            @click.stop="remove(item)"
            v-html="menuChipRemoveIcon"
          ></button>
          <button
            v-else
            data-name="menuChipRemoveIcon"
            :class="getClasses('menuChipRemoveIcon')"
            @click.stop="remove(item)"
          >
            <svg
              data-name="menuChipRemoveIconSvg"
              :class="getClasses('menuChipRemoveIconSvg')"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path
                data-name="menuChipRemoveIconPath"
                :class="getClasses('menuChipRemoveIconPath')"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </button>
        </div>
      </div>
      <li
        :data-name="`menuItem${item.selected ? ' selectedMenuItem' : ''}`"
        v-for="item of dropdownItems"
        :class="[
          getClasses('menuItem'),
          `${item.selected ? getClasses('selectedMenuItem') : ''}`,
        ]"
        @click="select(item)"
      >
        <span data-name="itemContent" :class="getClasses('itemContent')">{{
          itemValue(item.value)
        }}</span>
        <template v-if="item.selected">
          <div
            data-name="itemCheckedIcon"
            v-if="itemCheckedIcon"
            v-html="itemCheckedIcon"
            :class="getClasses('itemCheckedIcon')"
          ></div>
          <div v-else data-name="itemCheckedIcon" :class="getClasses('itemCheckedIcon')">
            <svg
              data-name="itemCheckedIconSvg"
              :class="getClasses('itemCheckedIconSvg')"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path
                data-name="itemCheckedIconPath"
                :class="getClasses('itemCheckedIconPath')"
                d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"
              />
            </svg>
          </div>
        </template>

        <template v-else>
          <div
            data-name="itemUncheckedIcon"
            v-if="itemUncheckedIcon"
            v-html="itemUncheckedIcon"
            :class="getClasses('itemUncheckedIcon')"
          ></div>
        </template>
      </li>
      <div
        data-name="noItems"
        :class="getClasses('noItems')"
        v-if="!dropdownItems.length"
      >
        {{ noItemsPlaceholder }}
      </div>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

const defaultClasses = {
  container: {
    width: "w-full",
    position: "relative",
    addClasses: "",
  },
  header: {
    display: "flex",
    gap: "gap-2",
    width: "w-full",
    cursor: "cursor-pointer",
    justifyContent: "justify-between",
    borderRadius: "rounded-md",
    backgroundColor: "bg-white",
    padding: "px-4",
    fontSize: "text-sm",
    boxShadow: "shadow-sm",
    hover: "hover:bg-gray-50",
    alignItems: "items-center",
    border: "border border-slate-300",
    position: "relative",
    addClasses: "",
  },
  headerBox: {
    display: "flex",
    width: "w-full",
    alignItems: "items-center",
    justifyContent: "justify-start",
    gap: "gap-2",
    overflow: "overflow-hidden",
    addClasses: "",
  },
  headerChipSection: {
    display: "flex",
    width: "w-full",
    flexWrap: "flex-wrap",
    gap: "gap-2",
    padding: "py-1.5",
    addClasses: "",
  },
  headerChip: {
    display: "flex",
    alignItems: "items-center",
    justifyContent: "justify-between",
    gap: "gap-2",
    textOverflow: "truncate",
    borderRadius: "rounded-full",
    backgroundColor: "bg-slate-200",
    padding: "py-1 px-3",
    fontSize: "text-xs",
    addClasses: "",
  },
  headerChipContent: {
    textOverflow: "truncate",
    addClasses: "",
  },
  headerChipRemoveIcon: {
    width: "w-4",
    height: "h-4",
    minWidth: "min-w-[1rem]",
    cursor: "cursor-pointer",
    userSelect: "select-none",
    addClasses: "",
  },
  headerChipRemoveIconSvg: {
    width: "w-full",
    height: "h-full",
    addClasses: "",
  },
  headerChipRemoveIconPath: {
    fill: "fill-slate-600",
    addClasses: "",
  },
  headerLabel: {
    textOverflow: "truncate",
    padding: "py-2",
    addClasses: "",
  },
  collapsedIcon: {
    height: "h-5",
    width: "w-5",
    minWidth: "min-w-[1.25rem]",
    userSelect: "select-none",
    addClasses: "",
  },
  collapsedIconSvg: {
    width: "w-full",
    height: "h-full",
    addClasses: "",
  },
  collapsedIconPath: {
    fill: "fill-slate-600",
    addClasses: "",
  },
  expandedIcon: {
    height: "h-5",
    width: "w-5",
    minWidth: "min-w-[1.25rem]",
    userSelect: "select-none",
    addClasses: "",
  },
  expandedIconSvg: {
    width: "w-full",
    height: "h-full",
    addClasses: "",
  },
  expandedIconPath: {
    fill: "fill-slate-600",
    addClasses: "",
  },
  menu: {
    position: "absolute",
    right: "right-0",
    left: "left-0",
    zIndex: "z-10",
    margin: "mt-2",
    maxHeight: "max-h-72",
    overflow: "overflow-auto",
    border: "border",
    borderRadius: "rounded-md",
    backgroundColor: "bg-white",
    boxShadow: "shadow-md",
    addClasses: "",
  },
  menuChipSection: {
    display: "flex",
    flexWrap: "flex-wrap",
    gap: "gap-2",
    border: "border-b border-solid border-slate-300",
    padding: "p-2",
    addClasses: "",
  },
  menuChip: {
    display: "flex",
    alignItems: "items-center",
    justifyContent: "justify-between",
    gap: "gap-2",
    textOverflow: "truncate",
    borderRadius: "rounded-full",
    backgroundColor: "bg-slate-200",
    padding: "py-1 px-3",
    fontSize: "text-xs",
    addClasses: "",
  },
  menuChipContent: {
    textOverflow: "truncate",
    addClasses: "",
  },
  menuChipRemoveIcon: {
    height: "h-4",
    width: "w-4",
    minWidth: "min-w-[1rem]",
    userSelect: "select-none",
    cursor: "cursor-pointer",
    addClasses: "",
  },
  menuChipRemoveIconSvg: {
    width: "w-full",
    height: "h-full",
    addClasses: "",
  },
  menuChipRemoveIconPath: {
    fill: "fill-slate-600",
    addClasses: "",
  },
  menuItem: {
    display: "flex",
    cursor: "cursor-pointer",
    alignItems: "items-center",
    justifyContent: "justify-between",
    gap: "gap-2",
    padding: "px-4 py-2",
    fontSize: "text-sm",
    color: "text-slate-700",
    hover: "hover:bg-slate-100 hover:text-slate-900",
    addClasses: "",
  },
  selectedMenuItem: {
    backgroundColor: "bg-slate-100",
    addClasses: "",
  },
  itemContent: {
    addClasses: "",
  },
  itemCheckedIcon: {
    height: "h-4",
    width: "w-4",
    minWidth: "min-w-[1rem]",
    userSelect: "select-none",
    cursor: "cursor-pointer",
    addClasses: "",
  },
  itemCheckedIconSvg: {
    width: "w-full",
    height: "h-full",
    addClasses: "",
  },
  itemCheckedIconPath: {
    fill: "fill-slate-600",
    addClasses: "fill-slate-800",
  },
  itemUncheckedIcon: {
    height: "h-4",
    width: "w-4",
    minWidth: "min-w-[1rem]",
    userSelect: "select-none",
    cursor: "cursor-pointer",
    addClasses: "",
  },
  itemUncheckedIconSvg: {
    width: "w-full",
    height: "h-full",
    addClasses: "",
  },
  itemUncheckedIconPath: {
    fill: "fill-slate-600",
    addClasses: "",
  },
  noItems: {
    padding: "px-4 py-2",
    fontSize: "text-sm",
    addClasses: "",
  },
};

type NestedPartial<T> = {
  [key in keyof T]?: Partial<T[key]>;
};

export type Item = string | ItemObject;

type ItemObject = { id: number | string; value: any };

type SelectedItem = { value: Item; selected: boolean };

const SELECT_ITEM_EVENT = "select-item";

export const HeaderMode = {
  CHIP: "CHIP",
  TEXT: "TEXT",
};

export default defineComponent({
  props: {
    classes: {
      type: Object as () => NestedPartial<typeof defaultClasses>,
      default: defaultClasses,
    },

    headerMode: {
      type: String,
      default: HeaderMode.CHIP,
    },

    textItemSeparator: {
      type: String,
      default: ", ",
    },

    showMenuChipSection: {
      type: Boolean,
      required: false,
    },

    items: {
      type: Object as () => Item[],
      required: true,
    },

    selected: {
      type: Object as () => Item[],
      required: false,
      default: [] as Item[],
    },

    placeholder: {
      type: String,
      default: "Select",
    },

    noItemsPlaceholder: {
      type: String,
      default: "No items",
    },

    eager: {
      type: Boolean,
      required: false,
    },

    itemCheckedIcon: {
      type: String,
      required: false,
    },

    itemUncheckedIcon: {
      type: String,
      required: false,
    },

    headerChipRemoveIcon: {
      type: String,
      required: false,
    },

    menuChipRemoveIcon: {
      type: String,
      required: false,
    },
  },

  emits: [SELECT_ITEM_EVENT],

  data() {
    return {
      HeaderMode,
      defaultClasses: defaultClasses,
      display: false,
      selectedItems: [...this.selected],
    };
  },

  computed: {
    dropdownItems(): SelectedItem[] {
      return this.items.map((el: Item) => {
        if (typeof el == "string") {
          return { value: el, selected: this.selectedItems.includes(el) };
        } else if (typeof el == "object") {
          return {
            value: el,
            id: el.id,
            selected: !!(this.selectedItems as ItemObject[]).find((e) => e.id == el.id),
          };
        }
        return el;
      });
    },
  },

  mounted() {
    if (this.eager) this.$emit(SELECT_ITEM_EVENT, this.selectedItems);
    document.addEventListener("click", this.handleClickOutside, true);
  },

  unmounted() {
    document.removeEventListener("click", this.handleClickOutside, true);
  },

  methods: {
    // external api
    selectItems(items: Item[], emit = true) {
      this.selectedItems = items;
      if (emit) this.$emit(SELECT_ITEM_EVENT, this.selectedItems);
    },

    getClasses(elementName: keyof typeof this.defaultClasses): string {
      const classes = this.classes[elementName] || {};
      return Object.values({
        ...this.defaultClasses[elementName],
        ...classes,
      }).join(" ");
    },

    toggle() {
      this.display = !this.display;
    },

    handleClickOutside(event: MouseEvent) {
      if (!this.$el.contains(event.target)) this.display = false;
    },

    itemValue(item: Item) {
      return typeof item == "object" ? item.value : item;
    },

    select(item: SelectedItem) {
      item.selected = !item.selected;

      if (!item.selected) {
        this.selectedItems = this.selectedItems.filter(
          (i) => !this.isEqualTo(i, item.value)
        );
      } else {
        this.selectedItems.push(item.value);
      }

      this.$emit(SELECT_ITEM_EVENT, this.selectedItems);
    },

    remove(item: Item) {
      for (const i of this.dropdownItems) {
        if (typeof i.value == "string" && i.value === item) i.selected = false;
        else if (typeof i.value == "object" && this.isEqualTo(i.value, item))
          i.selected = false;
      }

      this.selectedItems = this.selectedItems.filter((i) => !this.isEqualTo(i, item));
      this.$emit(SELECT_ITEM_EVENT, this.selectedItems);
    },

    isEqualTo(item1: Item, item2: Item) {
      if (typeof item1 == "string") return item1 == item2;
      if (typeof item2 == "object") return item1.id == item2.id;
      return false;
    },
  },
});
</script>
