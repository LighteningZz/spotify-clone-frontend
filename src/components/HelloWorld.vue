<template>
  <v-container fluid>
    <v-row>
      <v-col class="bg-black">

        <v-text-field class="mx-auto" density="comfortable" menu-icon="" placeholder="Search"
          prepend-inner-icon="fas fa-search" style="max-width: 350px;" theme="light" variant="solo" auto-select-first
          item-props rounded>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="fill-height">
    <v-row class="fill-height ">
      <v-col>
        <v-sheet class="pa-4 fill-height">
          <v-icon icon="fas fa-book-open"></v-icon>
          Your Library
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-4 fill-height">
          .v-col-auto
        </v-sheet>
      </v-col>
      <v-col class="fill-height">
        <v-sheet class="pa-4 fill-height">
          .v-col-auto
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
//
</script>
