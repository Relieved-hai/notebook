<template>
  <div>
    <div style="position: relative;height: 300px;">
      <div class="cloudy2"></div>
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
  .cloudy2 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 260px;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 200%;
    color: #fff;
    background: #2EB5E5;
    border-radius: 5px;
  }

  .cloudy2:before {
    content: "";
    text-indent: 23px;
    font-size: 22px;
    line-height: 40px;
    color: #333;
    position: absolute;
    height: 50px;
    width: 50px;
    background: #FFFFFF;
    left: 30%;
    top: 55%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 100;
    box-shadow: #FFFFFF 65px -15px 0 -5px,
    #FFFFFF 25px -25px,
    #FFFFFF 30px 10px,
    #FFFFFF 60px 15px 0 -10px,
    #FFFFFF 85px 5px 0 -5px;
    animation: cloudy2 5s ease-in-out infinite;
  }

  .cloudy2:after {
    content: "";
    position: absolute;
    top: 45%;
    left: 63%;
    height: 60px;
    width: 60px;
    z-index: 10;
    background: linear-gradient(180deg, #FE9F38 0%, #F46635 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 4px #FFA563;
    animation: cloudy2 10s ease-in-out infinite;
  }

  @keyframes cloudy2 {
    50% {
      transform: translate(-50%, -70%);
    }
    100% {
      transform: translate(-50%, -50%);
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
    name: "cloudy2"
  }
</script>

<style scoped>
  .cloudy2 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 260px;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 200%;
    color: #fff;
    background: #2EB5E5;
    border-radius: 5px;
  }

  .cloudy2:before {
    content: "";
    text-indent: 23px;
    font-size: 22px;
    line-height: 40px;
    color: #333;
    position: absolute;
    height: 50px;
    width: 50px;
    background: #FFFFFF;
    left: 30%;
    top: 55%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 100;
    box-shadow: #FFFFFF 65px -15px 0 -5px,
    #FFFFFF 25px -25px,
    #FFFFFF 30px 10px,
    #FFFFFF 60px 15px 0 -10px,
    #FFFFFF 85px 5px 0 -5px;
    animation: cloudy2 5s ease-in-out infinite;
  }

  .cloudy2:after {
    content: "";
    position: absolute;
    top: 45%;
    left: 63%;
    height: 60px;
    width: 60px;
    z-index: 10;
    background: linear-gradient(180deg, #FE9F38 0%, #F46635 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 4px #FFA563;
    animation: cloudy2 10s ease-in-out infinite;
  }

  @keyframes cloudy2 {
    50% {
      transform: translate(-50%, -70%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

</style>
