<template>
<div class="pagination">
    <!-- 上 -->
    <button 
        :disabled="pageNo == 1"
        @click="$emit('getPageNo', pageNo-1)">上一页</button>
        <button 
        v-if="startNumberAndEndNumber.start >= 2"
        :class="{active:pageNo == 1}">1</button>
    <button
        v-if="startNumberAndEndNumber.start >= 2" >···</button>

    <!-- 中间部分 -->
    <button 
        v-for="(item, index) in startNumberAndEndNumber.end" 
        :key="index"
        v-if="item >= startNumberAndEndNumber.start"
        @click="$emit('getPageNo', item)"
        :class="{active:pageNo == item}">{{item}}</button>


    <!-- 下 -->
    <button v-if="startNumberAndEndNumber.end < totalPage - 1">···</button>
    <button 
        v-if="startNumberAndEndNumber.end < totalPage"
        @click="$emit('getPageNo', totalPage)"
        :class="{active:pageNo==totalPage}">{{totalPage}}</button>

    <button 
        :disabled="pageNo==totalPage"
        @click="$emit('getPageNo', pageNo+1)">下一页</button>

    <button style="margin-left:30px">
        共 {{total}} 条
    </button>
</div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['total', 'pageNo', 'pageSize', 'continues'],
    computed: {
        // 一共多少页
        totalPage(){
            console.log('====', this);
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算连续页码的其实数据，结束数据。
        startNumberAndEndNumber(){
            let start = 0, end = 0;
            // totalPage < continues
            if(this.totalPage < this.$props.continues){
                start = 1;
                end = this.totalPage;
            }else{
                start = this.$props.pageNo - parseInt(this.$props.continues / 2);
                end = this.$props.pageNo + parseInt(this.$props.continues / 2);

                // 考虑负数 & 0情况！
                if (start < 1){
                    start = 1;
                    end = this.continues;
                }
                // 考虑 end
                if(end > this.totalPage){
                    end = this.totalPage;
                    start = end - this.continues + 1;
                }
            }

            return {start, end}
        }
    }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
    }
  } 
}
.active{
    background: skyblue;
}
</style>
