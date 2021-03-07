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
-- 查询课程表中课程标题含有 MYSQL 的，且学习人数大于 5000 人的课程标题。
-- 课程标题和学习人数
SELECT
  title,
  study_cnt
FROM
  imc_course
WHERE
  title LIKE '%mysql%'
  AND study_cnt > 5000;



-- 查询课程表中课程标题含有 MYSQL 的，或者学习人数大于 5000 人的课程标题。
-- 课程标题和学习人数
SELECT
  title,
  study_cnt
FROM
  imc_course
WHERE
  title LIKE '%mysql%'
  OR study_cnt > 5000;



-- 查询课程标题中含有 MySQL 关键字并且学习人数小于 5000，
-- 课程标题中不含有 MYSQL 关键字但学习人数大于 5000 的课程
-- 课程标题和学习人数

-- 方式一，分成两个SQL写，通过 UNION ALL 关键字，将两个查询结果关联起来
SELECT
  title, study_cnt
FROM
  imc_course
WHERE
  title LIKE '%mysql%' OR study_cnt < 5000;
UNION ALL
SELECT
  title, study_cnt
FROM
  imc_course
WHERE
  title NOT LIKE '%mysql%' OR study_cnt > 5000;

-- 方式二
-- 异或运算符，只有在两边一真一假时，才会返回真，如果都为真或都为假，就是假
-- 所以说这两边的表达式是不可能同时为真，或者同时为假，所以两边只会出现一真一假
SELECT
  title,
  study_cnt
FROM
  imc_course
WHERE
  study_cnt > 5000 XOR title LIKE '%mysql%';`
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

