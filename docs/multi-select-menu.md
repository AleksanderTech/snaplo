<script setup>
import MultiSelectMenu from './components/MultiSelectMenu.vue';
import { HeaderMode } from './components/MultiSelectMenu.vue'
</script>

<style module>
  ul[data-name="menu"] {
    list-style-type: none;
    padding-right: 0;
    padding-left: 0;
    margin-top: 0.5rem;
  }

  ul[data-name="menu"] li {
    margin: 0;
  }
</style>

# Multi Select Menu

Multi Select Menu is used to pick multiple values from a list of options.

## Preview

<MultiSelectMenu
  :classes="{
        container: { addClasses: 'dark:text-gray-900' },
        header: {
          addClasses: 'dark:text-white border dark:border-gray-700',
          backgroundColor: 'dark:bg-gray-900',
          hover: 'dark:hover:bg-gray-800',
        },
        menu: { addClasses: 'dark:text-white border dark:border-gray-700', backgroundColor: 'dark:bg-gray-900 bg-white' },
        menuItem: { hover: 'dark:hover:bg-gray-800 hover:bg-gray-50', color: 'dark:text-gray-200' },
        menuChipSection: { border: 'border-b border-solid border-gray-300 dark:border-gray-600' },
        selectedMenuItem: { backgroundColor: 'dark:bg-gray-800 bg-gray-50' },
        expandedIconPath: { fill: 'dark:fill-gray-200' },
        collapsedIconPath: { fill: 'dark:fill-gray-200' },
        itemCheckedIconPath: { fill: 'dark:fill-gray-100' },
        menuChip: { backgroundColor: 'bg-gray-700' },
        headerChip: { backgroundColor: 'bg-gray-100 dark:bg-gray-700' },
        menuChipRemoveIconPath: { fill: 'dark:fill-gray-100' },
        headerChipRemoveIconPath: { fill: 'dark:fill-gray-100' },
      }"
:header-mode="HeaderMode.CHIP"
:selected="['One']"
:items="['One', 'Two', 'Three', 'Four', 'Five']">
</MultiSelectMenu>

## Usage

<<< @/components/MultiSelectMenuClient.vue

## Code

<<< @/components/MultiSelectMenu.vue
