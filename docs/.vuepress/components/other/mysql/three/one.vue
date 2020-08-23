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
-- 冻结用户'沙占'的账号
--
-- 1、先查询
SELECT user_nick, user_status
FROM imc_user
WHERE user_nick = '沙占'

-- 2、UPDATE：修改的表
-- SET：将 user_status 改为 0
-- WHERE：过滤条件是 user_nick 为 '沙占' 的这行
UPDATE imc_user
SET user_status = 0
WHERE user_nick = '沙占'



-- 随机推荐 10 门课程
-- 1、增加一个字段来确定时是否是推荐
-- 2、随机查询 10 门课程，使用随机函数 RAND()，来给它随机排序。
-- 3、使用 LIMIT 随机取出 10 行数据
SELECT course_id
FROM imc_course
ORDER BY RAND()
LIMIT 10

-- 4、将 SELECT 改为 UPDATE
-- SET：将 is_recommand 改为 1
UPDATE imc_course
SET is_recommand = 1
ORDER BY RAND()
LIMIT 10




-- 利用课程评价表中的评分，更新课程表中课程的评分
-- 1、之前讲到过，这里也是先查出来数据
SELECT
  course_id,
  AVG( content_score ) AS avg_content,
  AVG( level_score ) AS avg_level,
  AVG( logic_score ) AS avg_logic,
  AVG( score ) AS avg_score
FROM
  imc_classvalue
GROUP BY
  course_id

-- 2、首先将上面的查询作为一个子查询使用，
-- 由于待两个表关联后，才能确认数据更新的值，所以在 UPDATE 时，
--   需要关联，a、b，关联条件是 a.course_id = b.course_id
-- SET：需要修改的值：a.content_score = b.avg_content，...
UPDATE imc_course a
JOIN (
  SELECT
    course_id,
    AVG( content_score ) AS avg_content,
    AVG( level_score ) AS avg_level,
    AVG( logic_score ) AS avg_logic,
    AVG( score ) AS avg_score
  FROM
    imc_classvalue
  GROUP BY
    course_id
  ) b ON a.course_id = b.course_id
  SET
    a.content_score = b.avg_content,
    a.level_score = b.avg_level,
    a.logic_score = b.avg_logic,
    a.score = b.avg_score;
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
    name: "one"
  }
</script>

