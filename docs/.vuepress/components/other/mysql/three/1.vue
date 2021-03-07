<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="上图 sql" name="1">
      <div class="code" style="position:relative;">
          <pre class="language-css">
            <code ref="code"></code>
          </pre>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import Prism from "prismjs"

  export default {
    methods: {
      handleChange(val) {
      },
      setCode() {
        const code = `
-- 学习人数等于 1000 人的课程都有那些？
-- 列出他们的课程标题和学习人数
SELECT
  title,
  study_cnt
FROM
  imc_course
WHERE study_cnt = 1000;



-- 区间查询，除了 <= >= 的方式，也可以使用 BETWEEN
-- 学习人数大于等于 1000 人并且小于等于 2000 人的课程都有那些？
-- 列出他们的课程标题和学习人数
SELECT
  title,
  study_cnt
FROM
  imc_course
WHERE
  study_cnt BETWEEN 1000
  AND 2000;



-- 判断这个字符串中是否包含 mysql，且前后包含任意多的字符
-- 结果会返回 1，在 MYSQL 中返回 1，表示真
SELECT 'this is mysql course' LIKE '%mysql%';



-- 判断这个字符串中，是否包含 'ysql' 字符，且前面有任意一个字符
-- 返回 1
SELECT 'Mysql' LIKE '_ysql';



-- 判断这个字符串中，是否包含 'ysql' 字符，且前面有任意一个字符
-- 返回 0
SELECT '_Mysql' LIKE '_ysql';


-- 查询课程表，列出课程名称，过滤条件就是课程ID是 1，3，5，7，9 的课程。
SELECT
  title
FROM
  imc_course
WHERE
  course_id IN ( 1, 3, 5, 7, 9 );`
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
    name: "1"
  }
</script>

