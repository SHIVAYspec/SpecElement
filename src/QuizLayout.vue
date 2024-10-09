<script setup lang="ts">
import PeriodicTable from '@/components/periodicTable/main.vue'
import InputAndResult from '@/components/inputAndResult/main.vue'
</script>

<template>
  <div class="box periodicTable">
    <PeriodicTable />
  </div>
  <div class="box inputAndResult">
    <InputAndResult />
  </div>
</template>

<style>
.box {
  border: 1px solid black;
  padding: 3px;
  width: 1008px;
  max-width: 100%;
  overflow: auto;
}
.periodicTable {
  height: 560px;
  max-height: 100%;
  background-color: #a9cce3;
}
.inputAndResult {
  height: 50px;
  min-height: 50px;
  background-color: #f4d03f;
}
</style>
