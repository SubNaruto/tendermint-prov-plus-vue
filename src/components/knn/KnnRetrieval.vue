<template>
    <div>
        <div>
            <br>
            <div style="overflow: hidden;">

                <!-- 向量 -->
                <div style="float: left;width: 60%;">

                    <div style="float: left;width: 10%;">
                        <div id="font-style">
                            向量
                        </div>
                    </div>

                    <div style="float: left;width: 90%;">
                        <div style="float: left;width: 100%;">
                            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="vector">
                            </el-input>
                        </div>
                    </div>

                </div>

                <div style="float: left;width: 40%;">
                    <!-- K邻近参数 -->
                    <div style="overflow: hidden;">

                        <div style="float: left;width: 30%;">
                            <div id="font-style">
                                K邻近参数
                            </div>
                        </div>

                        <div style="float: left;width: 70%;">
                            <el-input v-model="k" placeholder="请输入K"></el-input>
                        </div>

                    </div>

                    <!-- 按钮 -->
                    <div style="text-align: center;margin-top: 70px;">
                        <el-button type="success" plain @click="generate()"> <i class="el-icon-s-data"></i>
                            向量生成</el-button>

                        <el-button type="primary" plain style="margin-left: 10%" @click="retrieve()"> <i
                                class="el-icon-search"></i> 检索</el-button>

                        <el-button type="warning" style="margin-left: 10%;" plain @click="clear()"> <i
                                class="el-icon-delete"></i> 清空</el-button>

                    </div>
                </div>

            </div>

            <br>

            <!-- 响应区域 -->
            <div style="overflow: hidden;">
                <div style="float: left;width: 50%;">
                    <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="res0">
                    </el-input>
                </div>

                <div style="float: left;width: 50%;">
                    <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="res1">
                    </el-input>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "MyKnnRetrieval",
    data() {
        return {
            dataType: this.$route.query.dataType,
            vector: [],
            k: 0,
            res0: '',
            res1: ''
}
    },

    methods: {
        retrieve() {
            // alert(typeof this.vector)
            axios.post('/api/knnOperation0', {
                vector_code:"",
                op_type: 3,
                vector: this.vector,
                k: Number(this.k),
                data_type: Number(this.dataType),
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

        generate() {
            this.vector = []
            for (let i = 0; i < 128; i++) {
                this.vector.push((Math.random() * 10).toFixed(3))
            }
        },

        clear() {
            this.vector = []
            this.k = 0
        }
    }
}
</script>

<style></style>