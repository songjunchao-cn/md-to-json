<!--
 * @Author: sjc
 * @Date: 2020-03-10 22:21:03
 * @LastEditTime: 2020-03-11 03:12:53
 * @Description: md to json
 -->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input type="file" ref="file" @change="getFile" />
    <VueTable msg="Welcome to Your Vue.js App" />
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
    getFile (e) {
      let files = e.target.files
      this.convertFile(files[0])
    },
    convertFile (file) {
      let reader = new FileReader()
      reader.readAsText(file);
      reader.onload = (e) => {
        let md = window.markdownit();
        //格式化为token数组
        let res = md.parse(e.currentTarget.result);
        console.log(res, 'arr')
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
      // let inlineArr = arr.filter(item => item.type === 'inline')
      // let titleArr = arr.filter(item => item.tag === 'h3')
      // console.log(titleArr)
      for (let index = 0; index < initArr.length; index++) {
        finalArr[index] = {}
        for (let i = 0; i < initArr[index].length; i++) {
          // let singleObj = {}
          if (initArr[index][i].type === 'heading_open' && initArr[index][i].tag === 'h3') {
            finalArr[index].title = initArr[index][i + 1].content
          }
          if (initArr[index][i].type === 'heading_open' && initArr[index][i].tag === 'h4') {
            console.log(i, 'i', initArr[index][i + 1])
            if (initArr[index][i + 1].content === '选项') {
              finalArr[index].type = 'SELECT'
            } 
            // else {
            //   if (initArr[index][i + 1].content === '解答') {
            //     console.log(initArr[index][i + 1].content)
            //   } else {
            //     finalArr[index].type = 'FILL'
            //   }
            // }
          }
        }
        //  if (Object.keys(this.singleObj).length > 0) {
        //     finalArr[index]=this.singleObj
        //   }
      }
      // this.finalArr = Array(titleArr.length / 2).fill({})
      console.log(finalArr, 'finalArr')
    }
  }
}
</script>
