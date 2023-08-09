<script setup>
import SingleSelectMenu from './components/SingleSelectMenu.vue';
</script>

<style module>
  ul[data-name="menuList"] {
    list-style-type: none;
    padding-right: 0;
    padding-left: 0;
    margin-top: 0.5rem;
  }

  ul[data-name="menuList"] li {
    margin: 0;
  }
</style>

# Single Select Menu

Single Select Menu is used to pick one value from a list of options.

## Preview

<SingleSelectMenu
 :classes="{
        container: { addClasses: 'dark:text-gray-900' },
        header: {
          addClasses: 'dark:text-white border dark:border-gray-700',
          backgroundColor: 'dark:bg-gray-900',
          hover: 'dark:hover:bg-gray-800',
        },
        menu: { addClasses: 'dark:text-white border dark:border-gray-700', backgroundColor: 'dark:bg-gray-900 bg-white' },
        menuItem: { hover: 'dark:hover:bg-gray-800 hover:bg-gray-50' },
        selectedMenuItem: { backgroundColor: 'dark:bg-gray-800 bg-gray-50' },
        expandedIconPath: { fill: 'dark:fill-gray-200' },
        collapsedIconPath: { fill: 'dark:fill-gray-200' },
      }"
:placeholder="'Select'"
:items="['One', 'Two', 'Three', 'Four', 'Five']" >
</SingleSelectMenu>

## Usage

<<< @/components/SingleSelectMenuClient.vue

## Code

<<< @/components/SingleSelectMenu.vue
