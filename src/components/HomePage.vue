<template>
    <div element-loading-text="处理中，请耐心等待..." v-loading="loading">

        <!-- 标题 -->
        <div
            style="color:white;font-size: larger;font-weight: bolder;padding: 20px;background-color: rgb(84, 92, 100);overflow: hidden;">
            <div style="float: left;width: 80%;">
                课题二 - 区块链查询子系统
            </div>

            <div style="float: right;cursor: pointer;" @click="exit()">
                <i class="el-icon-switch-button"></i>
                Exit
            </div>

        </div>

        <!-- 内容 -->
        <div style="overflow: hidden">

            <!-- 导航菜单 -->
            <div style="float: left;width:300px;">
                <el-row class="tac" style="height: 920px;">
                    <el-col style="height: 100%">
                        <el-menu style="height: 100%" default-active="0" class="el-menu-vertical-demo"
                            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">


                            <el-menu-item index="0" style="margin-top:5px" @click="gotoDeployment">
                                <i class="el-icon-setting"></i>
                                <span slot="title">节点部署 [Node Deployment]</span>
                            </el-menu-item>

                            <el-menu-item index="1" id="el-menu-item-style" @click="gotoProv()">
                                <i class="el-icon-share"></i>
                                <span slot="title">溯源查询 [Provenance Query]</span>
                            </el-menu-item>

                            <el-menu-item index="2" id="el-menu-item-style" @click="gotoRetrieval(0)">
                                <i class="el-icon-camera"></i>
                                <span slot="title">视频检索 [Video Retrieval]</span>
                            </el-menu-item>

                            <el-menu-item index="3" id="el-menu-item-style" @click="gotoRetrieval(1)">
                                <i class="el-icon-s-operation"></i>
                                <span slot="title">序列检索 [Series Retrieval]</span>
                            </el-menu-item>

                            <el-menu-item index="4" id="el-menu-item-style" @click="gotoRetrieval(2)">
                                <i class="el-icon-tickets"></i>
                                <span slot="title">文本检索 [Text Retrieval]</span>
                            </el-menu-item>

                            <el-menu-item index="5" id="el-menu-item-style" @click="confirm(0)">
                                <i class="el-icon-upload"></i>
                                <span slot="title">向量生成 [Vector Generation]</span>
                            </el-menu-item>

                            <el-menu-item index="6" id="el-menu-item-style" @click="confirm(1)">
                                <i class="el-icon-data-analysis"></i>
                                <span slot="title">性能测试 [Performance Test]</span>
                            </el-menu-item>

                        </el-menu>
                    </el-col>

                </el-row>
            </div>


            <!-- main body -->
            <div style="float: left;width:1200px;">

                <div style="overflow: hidden;">
                    <img src="../assets/pic/p0.png" style="height: 300px;width: 780px;margin: 5px" alt="404 not found">
                    <img src="../assets/pic/p1.png" style="height: 300px;width: 400px;" alt="404 not found">
                </div>

                <div>
                    <router-view name="nodeDeploy"></router-view>
                    <router-view name="provQuery"></router-view>
                    <router-view name="knnRetrieval"></router-view>
                </div>

            </div>


            <el-dialog :visible.sync="submitTxDialogVisible" width="50%" append-to-body>
                <el-input type="textarea" rows="24" :value="textarea">
                </el-input>
            </el-dialog>

            <el-dialog :visible.sync="jmeterDialogVisible" width="50%" append-to-body>
                <el-input type="textarea" rows="24" :value="jmRes">
                </el-input>
            </el-dialog>


            <el-dialog :visible.sync="dialogVisible" width="20%" append-to-body>
                <div style="font-size: larger;">{{ confirmation }}<el-button type="primary" round plain
                        @click="dialogVisible = false, t == 0 ? submitTx() : jmeter()">确定</el-button>
                </div>
            </el-dialog>


        </div>

    </div>
</template>

<script>
//import router from "@/router";
import axios from "axios"
export default {
    name: "MyHomepage",

    data() {
        return {
            loading: false,
            textarea: '',
            submitTxDialogVisible: false,
            jmeterDialogVisible: false,
            dialogVisible: false,
            confirmation: '',
            t: 0,

            jmRes: ''
        }
    },

    mounted() {
        this.gotoProv()
    },

    methods: {
        exit() {
            window.opener = null;
            window.open("about:blank", "_top").close()
        },
        gotoDeployment() {
            this.$router.push({
                path: '/nodeDeploy'
            });
        },
        gotoProv() {
            this.$router.push({
                path: '/provQuery'
            })
        },
        gotoRetrieval(dataType) {
            this.$router.push({
                path: '/knnRetrieval',
                query: {
                    dataType: dataType
                }
            })
        },

        submitTx() {
            this.textarea = ''
            this.loading = true

            axios.post('/api/submitTx').then((response) => {
                if (response.data.code == 0) {
                    this.textarea = response.data.data

                    this.loading = false

                    this.submitTxDialogVisible = true

                    this.$message({
                        showClose: true,
                        message: 'Success',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: response.data.msg,
                        type: 'warning'
                    });
                    this.loading = false
                }
            }).catch((error) => {
                this.$message({
                    message: error.message,
                    type: 'warning',
                    showClose: true,
                });
                this.loading = false
            })
        },

        jmeter() {
            this.jmRes = ''
            this.loading = true
            axios.post('/test/jmeter').then((response) => {
                if (response.data.code == 0) {
                    this.jmRes = response.data.msg

                    this.loading = false

                    this.jmeterDialogVisible = true

                    this.$message({
                        showClose: true,
                        message: 'Success',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: response.data.msg,
                        type: 'warning'
                    });
                    this.loading = false
                }
            }).catch((error) => {
                
                this.$message({
                    message: error.message,
                    type: 'warning',
                    showClose: true,
                });
                this.loading = false
            })
        },


        confirm(t) {
            this.t = t
            if (t == 0) {
                this.confirmation = "确认进行交易生成？"
            } else if (t == 1) {
                this.confirmation = "确认进行性能测试？"
            }
            this.dialogVisible = true
        }
    }
}

</script>

<style scope>
#el-menu-item-style {
    margin-top: 30px
}
</style>