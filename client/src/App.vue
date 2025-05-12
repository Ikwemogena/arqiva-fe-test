<template>
  <main>
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </main>
</template>
