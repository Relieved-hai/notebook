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
        console.log(val);
      },
      setCode() {
        const code = `
--
-- JOIN
--
-- 查询出每一门课程的课程ID，课程名称和章节名称
-- 在 FROM 中，分别给两个表起了别名，且用 JOIN 进行关联起来，进行查询
-- ON 关联键是 b 表的 course_id 等于 a 表的 course_id
-- 查询出 a 表中的 课程ID，课程名称，b 表中的章节名称
SELECT
  a.course_id,
  a.title,
  b.chapter_name
FROM
  imc_course a
  JOIN imc_chapter b ON b.course_id = a.course_id;

--
-- LEFT JOIN
--
-- 查询出每一门课程的课程ID，课程名字和章节名称
-- 使用外关联将 A、B 关联起来，关联条件 b.course_id = a.course_id
-- WHERE 过滤条件是查询关联后，title 是 'MySQL TEST' 的数据
-- SELECT 查出 a 表的 course_id、title，b 表的 chapter_name
SELECT
  a.course_id,
  a.title,
  b.chapter_name
FROM
  imc_course a
  LEFT JOIN imc_chapter b ON b.course_id = a.course_id
WHERE
  title = 'MySQL TEST'

-- 查询出只存在于课程表中，但是不存在于章节表中的课程的课程名称和课程ID信息
-- 方式一
SELECT
  a.course_id,
  a.title
FROM
  imc_course a
WHERE
  course_id NOT IN ( SELECT b.course_id FROM imc_chapter b );

-- 方式二：它效率高于方式一的查询
-- 使用外关联将 A、B 关联起来，关联条件 b.course_id = a.course_id
-- WHERE 过滤条件是，查询出，关联之后，b 表中 course_id 为空的结果集
SELECT
  a.course_id,
  a.title
FROM
  imc_course a
  LEFT JOIN imc_chapter b ON b.course_id = a.course_id
WHERE
  b.course_id IS NULL`
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

