<!--
 * @Author: sjc
 * @Date: 2020-03-10 22:21:03
 * @LastEditTime: 2020-03-11 13:04:06
 * @Description: md to json
 -->
<template>
  <div class="home">
    <div class="btn-wrap" @click="handleClick">
      <input class="file-input" ref="file" type="file" @change="getFile" />
      导入
    </div>
    <VueTable :finalArr="finalArr" />
  </div>
</template>

<script>
// @ is an alias to /src
import VueTable from '@/components/VueTable.vue'

export default {
  name: 'Home',
  components: {
    VueTable
  },
  data () {
    return {
      finalArr: [],
      singleObj: {}
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      this.$refs.file.click()
    },
    getFile (e) {
      let files = e.target.files
      this.convertFile(files[0])
    },
    convertFile (file) {
      let reader = new FileReader()
      reader.readAsText(file);
      reader.onload = (e) => {
        let md = window.markdownit()
        //格式化为token数组
        let res = md.parse(e.currentTarget.result)
        this.convertJson(res)
      }
    },
    convertJson (arr) {
      let initArr = []
      let initIndex = []
      let sliceArr = []
      let finalArr = []
      arr.forEach((element, index) => {
        if (element.type === 'heading_open' && element.tag === 'h3') {
          initIndex.push(index)
        }
      });
      initIndex.push(arr.length)
      for (let i = 0; i < initIndex.length; i++) {
        if (initIndex[i + 1] <= arr.length) {
          sliceArr = arr.slice(initIndex[i], initIndex[i + 1])
          initArr.push(sliceArr)
        }
      }
      for (let index = 0; index < initArr.length; index++) {
        finalArr[index] = { id: index, type: 'FILL', createdAt: new Date(Date.now()).toISOString() }
        for (let i = 0; i < initArr[index].length; i++) {
          // h3标题为题目
          if (initArr[index][i].type === 'heading_open' && initArr[index][i].tag === 'h3') {
            finalArr[index].title = initArr[index][i + 1].content
            finalArr[index].answer = initArr[index][i + 4].content
          }
          // h4标题分为题目类型和解答
          if (initArr[index][i].type === 'heading_open' && initArr[index][i].tag === 'h4') {
            if (initArr[index][i + 1].content === '选项') {
              finalArr[index].type = 'SELECT'
              finalArr[index].options = []
              //ol标签开启
              if (initArr[index][i + 3].type === 'ordered_list_open') {
                let olIndex = initArr[index].findIndex((element) => (element.type === 'ordered_list_close'))
                let olArr = initArr[index].slice(i + 3, olIndex)
                olArr.forEach(element => {
                  if (element.type === 'inline' && element.content) {
                    finalArr[index].options.push(element.content)
                  }
                })
              }

            }
            //解答
            else if (initArr[index][i + 1].content === '解答') {
              console.log(initArr[index], i + 1)
              let hintTempArr = initArr[index].slice(i + 2, initArr[index].length)
              let hintArr = []
              hintTempArr.forEach(element => {
                if (element.content) {
                  hintArr.push(element.content)
                }
              });
              finalArr[index].hint = hintArr.join('\n\n')
            }
          }
        }
      }
      console.log(finalArr, 'finalArr')
      this.finalArr = finalArr
    }
  }
}
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
.btn-wrap {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  border: 1px solid transparent;
  white-space: nowrap;
  user-select: none;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
}
.btn-wrap:hover {
  color: #57a3f3;
  border-color: #57a3f3;
}
</style>
