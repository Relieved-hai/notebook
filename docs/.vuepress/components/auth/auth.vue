<template>
  <div>
    <el-dialog title="验证码"
               width="350px"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               :close-on-press-escape='false'
               :show-close="false">
      <el-input ref="dialog" autofocus v-model="input" placeholder="" @keyup.enter.native="okHandle"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="okHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "auth",
    data() {
      return {
        // 是否允许查看
        isOk: false,
        dialogVisible: false,
        timer: null,
        input: ''
      }
    },
    mounted() {
      this.openSyncAuth()
    },
    methods: {
      // 打开
      async openSyncAuth() {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.dialog.$el.children[0].focus();
          this.syncAuth()
        })
      },
      // 验证
      syncAuth() {
        this.timer = setInterval(() => {
          if (this.isOk) {
            clearInterval(this.timer)
            return
          }
          const _dom = this.$refs.dialog
          if (!_dom || !_dom.$el || !_dom.$el.clientWidth) {
            alert('意外错误，请重新尝试！')
          }
        }, 500)
      },
      // 确定
      okHandle() {
        if (!this.input) return;
        if (this.input !== 'pch') {
          this.input = ''
          this.$message.warning('验证码错误，请重新输入！')
          return
        }
        this.isOk = true
        this.dialogVisible = false
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    deactivated() {
      clearInterval(this.timer)
    }
  };
</script>

<style scoped></style>
