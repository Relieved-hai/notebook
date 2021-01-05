<template>
  <div class="learn-container">
    <el-row v-for="$items in catalogList"
            :key="$items.title"
            :gutter="20"
    >
      <el-col :span="24">
        <h4><i class="el-icon-collection-tag"/> {{ $items.title }}</h4>
      </el-col>
      <el-col v-for="($item, $idx) in $items.content"
              :key="`${$item.label}_${$idx}`"
              :span="6">
        <div class="box" @click="go($item)">
          <img src="./images/js.jpg"
               class="img">
          <p>
            {{ $item.label }}
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    catalogList: [
      {
        title: 'Javascript',
        content: [
          {
            label: 'Javascript 教程',
            value: '2',
            url: '/learn_javascript_asdiasdkc/'
          }
        ]
      },
      {
        title: 'Css',
        content: [
          {
            label: 'Css 教程',
            value: '2'
          }
        ]
      }
    ]
  }),
  methods: {
    go({ url = '' }) {
      if (!url) return
      window.location.href = `${window.location.origin}/notebook${url}`
    }
  }
}
</script>

<style scoped lang="scss">
.learn-container {

  .box {
    position: relative;
    width: 100%;
    margin-bottom: 14px;
    background: #fff;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #e4ecf3;
    cursor: pointer;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    text-align: center;

    &:hover {
      box-shadow: 0 7px 15px rgba(0, 0, 0, .1);
      transform: translate3d(0, -1px, 0);
    }

    .img {
      width: 80px;
      margin-top: 20px;
    }
  }
}

</style>
