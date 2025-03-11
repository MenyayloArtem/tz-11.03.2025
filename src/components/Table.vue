<script setup>
import { onMounted, watch } from 'vue';
import { useTableStore } from '../store/useTableStore';
import { ref } from 'vue';
import { AtomSpinner } from 'epic-spinners';
const store = useTableStore()
const albumIds = ref("")
const sort = ref("")

onMounted(() => {
    store.loadFirst()
})

watch(() => [store.sort], () => {
    store.loadFirst()
})

watch(() => store.items, (v) => {
    console.log(v)
})

function onScroll(e) {
    const clientHeight = e.target.clientHeight
    const scrollHeight = e.target.scrollHeight
    const scrollTop = e.target.scrollTop

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        store.loadMore(albumIds, sort)
    }
}
</script>

<template>
    <div @scroll="onScroll" class="mx-auto max-h-[600px] max-w-[600px] table-outer text-xs mt-6">
        <table class="table-fixed w-full my-table min-w-[600px] w-[600px] bg-white shadow-md rounded-lg">

            <thead class="bg-gray-50">
                <tr>
                    <th @click="store.sort = 'id'" :class="{ 'bg-gray-200': store.sort == 'id' }"
                        class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style="width: 50px;">ID</th>
                    <th @click="store.sort = 'albumId'" :class="{ 'bg-gray-200': store.sort == 'albumId' }"
                        class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style="width: 75px;">Альбом</th>
                    <th @click="store.sort = 'title'" :class="{ 'bg-gray-200': store.sort == 'title' }"
                        class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название
                    </th>
                    <th class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style="width: 20%;">Ссылка
                    </th>
                    <th class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style="width: 20%;">Миниатюра
                    </th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <tr v-for="item in store.items" :key="item.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-2 py-3 text-xs text-gray-900">{{ item.id }}</td>
                    <td class="px-2 py-3 text-xs text-gray-500">{{ item.albumId }}</td>
                    <td :title="item.title" class="px-2 py-3 text-xs text-gray-500">{{ item.title }}</td>
                    <td class="px-2 py-3 text-xs text-gray-500">
                        <a :href="item.url" :title="item.url" target="_blank"
                            class="text-indigo-600 hover:text-indigo-900 hover:underline">
                            {{ item.url }}
                        </a>
                    </td>
                    <td class="px-2 py-3 text-xs text-gray-500">
                        <a :href="item.thumbnailUrl" :title="item.thumbnailUrl" target="_blank"
                            class="text-indigo-600 hover:text-indigo-900 hover:underline">
                            {{ item.thumbnailUrl }}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="store.loading" class="mx-auto py-2 flex justify-center">
            <atom-spinner :animation-duration="1000" :size="60" color="#42b883aa" />
        </div>
    </div>
</template>