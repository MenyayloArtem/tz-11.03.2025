import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTableStore = defineStore("table", () => {
    let items = ref([])
    let page = ref(0)
    let loading = ref(false)
    let loadedMax = ref(false)

    async function loadItems(ids, sort) {
        ids = (ids?.value)
        const albumsQuery = ids ? ids.split(" ").map(id => `albumId=${id}`).join("&") : ""
        const sortQuery = sort?.value ? `&_sort=${sort.value}` : ""
        console.log(albumsQuery)
        const limit = page.value ? 20 : 30
        loading.value = true
        let res = await fetch(
            `https://jsonplaceholder.typicode.com/photos?${albumsQuery}${sortQuery}&_limit=${limit}&_page=${page.value + 1}`
        );
        let json = await res.json();
        loading.value = false
        return json
    }

    async function loadMore(ids, sort) {
        if (!loadedMax.value) {
            setPage(page.value + 1)
            let loadedItems = await loadItems(ids, sort)

            if (!loadedItems.length) {
                loadedMax.value = true
                return
            }

            loadedItems = page.value == 1 ? loadedItems.slice(10) : loadedItems
            items.value = items.value.concat(loadedItems)
        }
    }

    function setPage(num) {
        page.value = num
    }

    function resetPage() {
        setPage(0)
        loadedMax.value = false
    }

    async function loadFirst(albumIds, sort) {
        resetPage()
        let loadedItems = await loadItems(albumIds, sort)
        items.value = loadedItems
    }

    return {items, loading, loadFirst, loadMore}
});
