<template>
  <div>
    <div style="position: relative;height: 300px;">
      <div class="starry-container">
        <div class="starry"></div>
      </div>
    </div>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="查看 css" name="1">
        <div class="code" style="position:relative;">
          <pre class="language-css">
            <code ref="code"></code>
          </pre>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import Prism from "prismjs"

  export default {
    methods: {
      handleChange(val) {
      },
      setCode() {
        const code = `
  .starry-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 260px;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 200%;
    color: #fff;
    background: #222233;
    border-radius: 5px;
  }

  .starry {
    position: absolute;
    top: 30%;
    left: 40%;
    transform: translate(-50%, -50%);
    height: 4px;
    width: 4px;
    border-radius: 50%;
    box-shadow: #FFFFFF -26px 77px 0 -1px,
    rgba(255, 255, 255, 0.1) -36px 59px 0 -1px,
    rgba(255, 255, 255, 0.1) -28px 89px 0 -1px,
    #FFFFFF -35px 20px 0 -1px,
    #FFFFFF 14px 100px,
    rgba(255, 255, 255, 0.1) 41px 60px,
    #FFFFFF 34px 39px,
    rgba(255, 255, 255, 0.1) 14px 45px 0 -1px,
    #FFFFFF 64px 12px 0 -1px,
    rgba(255, 255, 255, 0.1) 32px 96px 0 -1px,
    #FFFFFF 64px 71px,
    rgba(255, 255, 255, 0.1) 60px 18px 0 -1px,
    #FFFFFF 34px 9px,
    rgba(255, 255, 255, 0.1) -26px 55px 0 -1px;
    animation: starry_star 5s ease-in-out infinite;
  }

  .starry:before {
    content: "";
    position: absolute;
    top: 20%;
    left: 50%;
    width: 100px;
    height: 100px;
    box-shadow: #FFFFFF -25px 0;
    transform: rotate(-5deg);
    border-radius: 50%;
    animation: starry 5s ease-in-out infinite;
  }

  @keyframes starry {
    50% {
      transform: rotate(10deg);
    }
  }

  @keyframes starry_star {
    50% {
      box-shadow: rgba(255, 255, 255, 0.1) -26px 77px 0 -1px,
      #FFF -36px 59px 0 -1px,
      #FFF -28px 89px 0 -1px,
      rgba(255, 255, 255, 0.1) -35px 20px 0 -1px,
      rgba(255, 255, 255, 0.1) 14px 100px,
      #FFF 41px 60px,
      rgba(255, 255, 255, 0.1) 34px 39px,
      #FFF 14px 45px 0 -1px,
      rgba(255, 255, 255, 0.1) 64px 12px 0 -1px,
      #FFF 32px 96px 0 -1px,
      rgba(255, 255, 255, 0.1) 64px 71px,
      #FFF 60px 18px 0 -1px,
      rgba(255, 255, 255, 0.1) 34px 9px,
      #FFF -26px 55px 0 -1px;
    }
  }
`
        this.$refs['code'].innerHTML = Prism.highlight(code, Prism.languages.css)
      }
    },
    mounted() {
      this.setCode();
    },
    data() {
      return {
        activeNames: ['0'],
        dialogVisible: false
      }
    },
    name: "starry"
  }
</script>

<style scoped>
  .starry-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 260px;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 200%;
    color: #fff;
    background: #222233;
    border-radius: 5px;
  }

  .starry {
    position: absolute;
    top: 30%;
    left: 40%;
    transform: translate(-50%, -50%);
    height: 4px;
    width: 4px;
    border-radius: 50%;
    box-shadow: #FFFFFF -26px 77px 0 -1px,
    rgba(255, 255, 255, 0.1) -36px 59px 0 -1px,
    rgba(255, 255, 255, 0.1) -28px 89px 0 -1px,
    #FFFFFF -35px 20px 0 -1px,
    #FFFFFF 14px 100px,
    rgba(255, 255, 255, 0.1) 41px 60px,
    #FFFFFF 34px 39px,
    rgba(255, 255, 255, 0.1) 14px 45px 0 -1px,
    #FFFFFF 64px 12px 0 -1px,
    rgba(255, 255, 255, 0.1) 32px 96px 0 -1px,
    #FFFFFF 64px 71px,
    rgba(255, 255, 255, 0.1) 60px 18px 0 -1px,
    #FFFFFF 34px 9px,
    rgba(255, 255, 255, 0.1) -26px 55px 0 -1px;
    animation: starry_star 5s ease-in-out infinite;
  }

  .starry:before {
    content: "";
    position: absolute;
    top: 20%;
    left: 50%;
    width: 100px;
    height: 100px;
    box-shadow: #FFFFFF -25px 0;
    transform: rotate(-5deg);
    border-radius: 50%;
    animation: starry 5s ease-in-out infinite;
  }

  @keyframes starry {
    50% {
      transform: rotate(10deg);
    }
  }

  @keyframes starry_star {
    50% {
      box-shadow: rgba(255, 255, 255, 0.1) -26px 77px 0 -1px,
      #FFF -36px 59px 0 -1px,
      #FFF -28px 89px 0 -1px,
      rgba(255, 255, 255, 0.1) -35px 20px 0 -1px,
      rgba(255, 255, 255, 0.1) 14px 100px,
      #FFF 41px 60px,
      rgba(255, 255, 255, 0.1) 34px 39px,
      #FFF 14px 45px 0 -1px,
      rgba(255, 255, 255, 0.1) 64px 12px 0 -1px,
      #FFF 32px 96px 0 -1px,
      rgba(255, 255, 255, 0.1) 64px 71px,
      #FFF 60px 18px 0 -1px,
      rgba(255, 255, 255, 0.1) 34px 9px,
      #FFF -26px 55px 0 -1px;
    }
  }

</style>
