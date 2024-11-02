<template>
    <div>
        <br>
        <div style="overflow: hidden;">
            <!-- 向量ID -->
            <div style="float: left;width: 50%;">

                <div style="float: left;width: 20%;">
                    <div id="font-style">
                        向量ID
                    </div>
                </div>

                <div style="float: left;width: 80%;">
                    <el-input v-model="vectorCode" placeholder="请输入向量ID"></el-input>
                </div>

            </div>

            <!-- 数据类型 -->
            <div style="float: left;width: 30%;">

                <div style="float: left;width: 30%;">
                    <div id="font-style">
                        数据类型
                    </div>
                </div>

                <div style="float: left;width: 70%;">
                    <el-select style="width: 90%;" v-model="dataType" placeholder="请选择数据类型">
                        <el-option v-for="item in dataTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>

            </div>

            <!-- 按钮 -->
            <div style="float: left;width: 20%;">

                <el-button type="primary" plain @click="prov()"> <i class="el-icon-search"></i> 查询</el-button>

                <el-button type="warning" style="margin-left: 10%;" plain @click="clear()"> <i
                        class="el-icon-delete"></i> 清空</el-button>

            </div>
        </div>

        <br>

        <!-- 响应区域 -->
        <div style="overflow: hidden;">
            <div style="float: left;width: 50%;">
                <el-input type="textarea" :rows="24" placeholder="请输入内容" v-model="res0">
                </el-input>
            </div>

            <div style="float: left;width: 50%;">
                <el-input type="textarea" :rows="24" placeholder="请输入内容" v-model="res1">
                </el-input>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "MyProvQuery",
    data() {
        return {
            vectorCode: "",
            dataTypes: [
                {
                    value: 0,
                    label: '视频'
                },
                {
                    value: 1,
                    label: '序列'
                },
                {
                    value: 2,
                    label: '文本'
                }],
            dataType: 0,
            res0: null,
            res1: null
        }
    },
    methods: {

        prov() {
            axios.post('/api/dataProvenance', {
                vector_code: this.vectorCode,
                data_type: this.dataType
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then((response) => {
                if (response.data.code == 0) {
                    this.$message({
                        showClose: true,
                        message: 'Success',
                        type: 'success'
                    });
                    this.res0 = JSON.stringify(response.data)
                    this.res1 = JSON.stringify(response.data, null, '\t')
                } else {
                    this.$message({
                        message: response.data.msg,
                        type: 'warning'
                    });
                }
            }).catch((error) => {
                this.$message({
                    message: error.message,
                    type: 'warning',
                    showClose: true,
                });
            })
        },

        clear() {
            this.vectorCode = ""
            this.dataType = 0
        }
    }
}
</script>

<style scope>
#font-style {
    font-size: 16px;
    font-weight: bolder;
    color: #606266;
    line-height: 40px;
    text-align: center;
}
</style>