<template>
  <main class="h-b">
    <div></div>
    <div></div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  padding: 0 10vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
}

div:nth-of-type(1) {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fafafa;
  margin: 105px 29px;
  box-shadow: 0 0 0 10px #E8E2D6, 0 0 0 20px #E1D9C9,
              0 0 0 30px #D9CFBB, 0 0 0 40px #D2C6AE,
              0 0 0 50px #CABCA0, 0 0 0 60px #C3B393,
              0 0 0 70px #BBA985, 0 0 0 80px #B4A078;
}

div:nth-of-type(2) {
  width: 200px;
  height: 120px;
  background: #efebe9;
  border: 5px solid #B4A078;
  outline: #B4A078 dashed 1px;
  outline-offset: -10px;
  margin-bottom: 20px;
}
</style>
