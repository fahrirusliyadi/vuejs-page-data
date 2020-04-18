export function makeMixin(pageData) {
  return {
    beforeCreate() {
      if (typeof this.$options.pageData === 'function') {
        this.$options.computed = this.$options.computed || {};
        // Set as a computed property to make it reactive based on its
        // dependencies.
        this.$options.computed.$_pageData = this.$options.pageData;
      }
    },
    created() {
      if (typeof this.$options.pageData === 'function') {
        // Merge with the global page data.
        pageData.merge(this.$_pageData);
        // Update global page data when the local data changed.
        this.$watch('$_pageData', (newValue) => pageData.merge(newValue), {
          deep: true,
        });
      }
    },
  };
}
