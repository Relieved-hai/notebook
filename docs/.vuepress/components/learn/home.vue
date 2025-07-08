<template>
  <div class="learn-container">
    <div
      class="content-group"
      v-for="$items in catalogList"
      :key="$items.title"
    >
      <h4><i class="el-icon-collection-tag" /> {{ $items.title }}</h4>
      <el-row :gutter="10">
        <el-col
          v-for="($item, $idx) in $items.content"
          :key="$idx"
          :xs="24"
          :sm="8"
          :md="6"
        >
          <div class="content-grid" @click="go($item)">
            <div
              class="img"
              :style="{ backgroundImage: `url(${$item.pic})` }"
            />
            <p class="label">{{ $item.label }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    catalogList: [
      {
        title: "Javascript",
        content: [
          {
            label: "Javascript",
            url: "/learn_javascript_asdiasdkc/",
            pic: require("./images/js.png"),
          },
          {
            label: "Javascript",
            url: "/javascript/",
            pic: require("./images/js.png"),
          },
          {
            label: "Typescript",
            url: "/typescript/",
            pic: require("./images/ts.png"),
          },
          // {
          //   label: 'Node',
          //   url: '/node/',
          //   pic: ''
          // }
        ],
      },
      {
        title: "Css",
        content: [
          {
            label: "Css 小样式",
            url: "/css_tricks/",
            pic: "",
          },
          {
            label: "Css 小样式",
            url: "/css_lhammer/",
            pic: "",
          },
          {
            label: "Css 小样式",
            url: "/css_chokcoco/",
            pic: "",
          },
        ],
      },
      {
        title: "Other",
        content: [
          {
            label: "Other",
            url: "/other/wechat/mixins/",
            pic: "",
          },
          {
            label: "Http",
            url: "/http/one/",
            pic: "",
          },
          {
            label: "初识算法",
            url: "/algorithm/readme/",
            pic: "",
          },
          {
            label: "React",
            url: "/react_18/02/01",
            pic: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
          },
        ],
      },
    ],
  }),
  methods: {
    go({ url = "" }) {
      if (!url) return;
      window.location.href = `${window.location.origin}/notebook${url}`;
    },
  },
};
</script>

<style scoped lang="scss">
.learn-container {
  user-select: none;

  .content-group {
    margin-bottom: 10px;
  }

  .content-grid {
    margin-bottom: 10px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #e4ecf3;
    box-sizing: border-box;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    cursor: pointer;

    &:hover {
      box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -1px, 0);
    }

    .img {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: transparent no-repeat center;
      background-size: 100% 100%;
      vertical-align: middle;
    }

    .label {
      display: inline-block;
      width: calc(100% - 45px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  }
}
</style>
