<!--
 * @Author: sjc
 * @Date: 2020-03-10 22:21:03
 * @LastEditTime: 2020-03-11 00:08:54
 * @Description: 
 -->
<template>
  <div class="wrap">
    <table>
      <tr>
        <th>序号</th>
        <th>题目</th>
        <th>答案</th>
        <th>选项</th>
        <th>解答</th>
        <th>类型</th>
        <th>创建时间</th>
      </tr>
      <tr v-for="item in finalArr" :key="item.id">
        <td>{{item.id+1}}</td>
        <td>{{item.title}}</td>
        <td>
          <span v-if="item.type==='FILL'">{{item.answer}}</span>
          <span v-else>{{item.options[item.answer-1]}}</span>
        </td>
        <td>
          <span v-for="(ele,index) in item.options" :key="ele">{{index+1}}.{{ele}}&nbsp;</span>
        </td>
        <td>{{item.hint }}</td>
        <td>{{item.type==='FILL'?'填空':'选择' }}</td>
        <td>{{$dateFormat(item.createdAt,'yyyy-MM-dd hh:mm:ss') }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VueTable',
  props: {
    finalArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.finalArr)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  border-collapse: collapse;
  margin: 0 auto;
  margin-top: 10px;
  text-align: center;
  width: 1200px;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
  text-align: center;
  padding: 1px;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
</style>
