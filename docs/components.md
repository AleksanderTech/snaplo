<script setup>
import SingleSelectDropdown from './components/SingleSelectDropdown.vue';
</script>

# Single Select Dropdown

Single Select Dropdown is used to pick one value from a list of options.

## Preview

<style>
  ul[data-name="menu"] {
    list-style-type: none !important;
    padding-right: 0;
    padding-left: 0;
  }

  ul[data-name="menu"] li {
    margin: 0;
  }
</style>

<SingleSelectDropdown
 :classes="{
        container: { otherStyles: 'dark:text-gray-900' },
        header: {
          otherStyles: 'dark:text-white border dark:border-gray-700',
          backgroundColor: 'dark:bg-gray-900',
          hover: 'dark:hover:bg-gray-800',
        },
        menu: { otherStyles: 'dark:text-white border dark:border-gray-700', backgroundColor: 'dark:bg-gray-900 bg-white' },
        menuItem: { hover: 'dark:hover:bg-gray-800 hover:bg-gray-50' },
        selectedMenuItem: { backgroundColor: 'dark:bg-gray-800 bg-gray-50' },
        expandedIconPath: { fill: 'dark:fill-gray-200' },
        collapsedIconPath: { fill: 'dark:fill-gray-200' },
      }"
:placeholder="'Select'"
:items="['One', 'Two', 'Three', 'Four', 'Five']" >
</SingleSelectDropdown>

## Usage

```vue
<SingleSelectDropdown
  :classes="{
    container: { otherStyles: 'dark:text-gray-900' },
    header: {
      otherStyles: 'dark:text-white',
      backgroundColor: 'dark:bg-gray-900',
      hover: 'dark:hover:bg-gray-800',
    },
    menu: {
      otherStyles: 'dark:text-white',
      backgroundColor: 'dark:bg-gray-900 bg-white',
    },
    menuItem: { hover: 'dark:hover:bg-gray-800 hover:bg-gray-50' },
    selectedMenuItem: { backgroundColor: 'dark:bg-gray-800 bg-gray-50' },
    expandedIconPath: { fill: 'dark:fill-gray-200' },
    collapsedIconPath: { fill: 'dark:fill-gray-200' },
  }"
  @select-item="onSelect($event)"
  :placeholder="'Select'"
  :items="['One', 'Two', 'Three', 'Four', 'Five']"
>
</SingleSelectDropdown>
```

## Code

```vue
<template>
  <div
    data-name="container"
    :class="getClasses('container')"
    v-click-outside="handleClickOutside"
  >
    <!-- header -->
    <div data-name="header" @click.stop="toggle()" :class="getClasses('header')">
      <label data-name="headerLabel" :class="getClasses('headerLabel')">
        {{ selectedItem || placeholder }}
      </label>
      <button
        data-name="collapsedIconWrapper"
        v-if="!display"
        :class="getClasses('collapsedIconWrapper')"
        v-html="
          firstIcon ||
          collapsedIcon({
            svgClasses: getClasses('collapsedIconSvg'),
            pathClasses: getClasses('collapsedIconPath'),
          })
        "
      ></button>
      <button
        data-name="expandedIconWrapper"
        v-else
        :class="getClasses('expandedIconWrapper')"
        v-html="
          secondIcon ||
          expandedIcon({
            svgClasses: getClasses('expandedIconSvg'),
            pathClasses: getClasses('expandedIconPath'),
          })
        "
      ></button>
    </div>

    <!-- menu -->
    <ul data-name="menu" v-if="display" :class="getClasses('menu')">
      <li
        :data-name="`menuItem ${item == selectedItem ? 'selectedMenuItem' : ''}`"
        v-for="item of items"
        :class="[
          getClasses('menuItem'),
          `${item == selectedItem ? getClasses('selectedMenuItem') : ''}`,
        ]"
        @click.stop="select(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

const collapsedIcon = ({
  svgClasses = "w-full h-full",
  pathClasses = "fill-gray-600",
} = {}) => {
  return `<svg data-name="collapsedIconSvg" xmlns="http://www.w3.org/2000/svg" class="${svgClasses}" height="48" width="48" viewBox="0 0 48 48"><path data-id="collapsedIconPath" class="${pathClasses}" d="m24 30.8-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>`;
};

const expandedIcon = ({
  svgClasses = "w-full h-full",
  pathClasses = "fill-gray-600",
} = {}) => {
  return `<svg data-name="expandedIconSvg" xmlns="http://www.w3.org/2000/svg" class="${svgClasses}" height="48" width="48" viewBox="0 0 48 48"><path data-id="expandedIconPath" class="${pathClasses}" d="M14.15 30.15 12 28l12-12 12 12-2.15 2.15L24 20.3Z"/></svg>`;
};

const SELECT_ITEM = "select-item";

const defaultClasses = {
  container: {
    otherStyles: "",
    width: "w-full",
    position: "relative",
  },
  header: {
    otherStyles: "",
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
    otherStyles: "",
    textOverflow: "truncate",
  },
  collapsedIconWrapper: {
    otherStyles: "",
    height: "h-5",
    width: "w-5",
    minWidth: "min-w-[1.25rem]",
  },
  collapsedIconSvg: {
    otherStyles: "",
    width: "w-full",
    height: "h-full",
  },
  collapsedIconPath: {
    otherStyles: "",
    fill: "fill-gray-600",
  },
  expandedIconWrapper: {
    otherStyles: "",
    height: "h-5",
    width: "w-5",
    minWidth: "min-w-[1.25rem]",
  },
  expandedIconSvg: {
    otherStyles: "",
    width: "w-full",
    height: "h-full",
  },
  expandedIconPath: {
    otherStyles: "",
    fill: "fill-gray-600",
  },
  menu: {
    otherStyles: "",
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
  menuItem: {
    otherStyles: "",
    pointer: "cursor-pointer",
    padding: "px-4 py-2",
    fontSize: "text-sm",
    hover: "hover:bg-gray-100 hover:text-gray-900",
  },
  selectedMenuItem: {
    otherStyles: "",
    backgroundColor: "bg-gray-100",
    fontWeight: "font-semibold",
  },
};

type NestedPartial<T> = {
  [key in keyof T]?: Partial<T[key]>;
};

export default defineComponent({
  props: {
    classes: {
      type: Object as () => NestedPartial<typeof defaultClasses>,
      default: defaultClasses,
    },

    items: {
      type: Object as () => string[],
      required: true,
    },

    selected: {
      type: String,
      required: false,
    },

    placeholder: {
      type: String,
      default: "Select",
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

  emits: [SELECT_ITEM],

  data() {
    return {
      collapsedIcon,
      expandedIcon,
      defaultClasses: defaultClasses,
      display: false,
      selectedItem: this.selected || null,
    };
  },

  mounted() {
    if (this.eager) this.$emit(SELECT_ITEM, this.selectedItem);
  },

  methods: {
    select(item: string | null) {
      this.selectedItem = this.selectedItem == item ? null : item;
      this.display = false;
      this.$emit(SELECT_ITEM, this.selectedItem);
    },

    getClasses(elName: keyof typeof this.defaultClasses): string {
      const classes = this.classes[elName] || {};
      return Object.values({
        ...this.defaultClasses[elName],
        ...classes,
      }).join(" ");
    },

    handleClickOutside() {
      this.display = false;
    },

    toggle() {
      this.display = !this.display;
    },
  },
});
</script>
```