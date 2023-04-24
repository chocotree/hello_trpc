<script setup lang="ts">
  import { trpc } from '@/helper';
  import { onMounted, ref } from 'vue';
  import type { RouterInput, RouterOutput } from '@/helper';

  const userList = ref<RouterOutput['getUserList']>([]);
  userList.value.map((user) => {
    user.name;
  });

  const createUser = async (params: RouterInput['createUser']) => {
    await trpc.createUser.mutate(params);
  };

  const getUserList = async () => {
    const res = await trpc.getUserList.query();
    userList.value = res;
  };

  onMounted(async () => {
    await createUser({
      age: 23,
      name: 'abc',
    });

    await getUserList();
  });
</script>

<template>
  <div>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <div>
      <pre>{{ JSON.stringify(userList, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
