<script setup>
import Table from './components/Table.vue';
import { useTableStore } from './store/useTableStore';

const store = useTableStore()
</script>

<template>
  <div>
    <div class="bg-gradient-to-br from-emerald-400 vie-green-400 to-indigo-400 h-[75px]">
      <div class="container h-full mx-auto w-full md:w-[600px] px-2">
        <div class="flex h-full w-[600px] items-center gap-4">
          <input v-model="albumIds" type="text" class="bg-white grow p-2" placeholder="Введите ID альбомовв" />
          <button @click="store.loadFirst()"
            class="bg-white hover:bg-gray-100 font-bold text-center text-gray-500 px-4 py-2 cursor-pointer">Поиск</button>
        </div>
      </div>
    </div>

    <div class="container mx-auto w-full md:w-[600px] px-2">
      <Table />
    </div>
  </div>
</template>