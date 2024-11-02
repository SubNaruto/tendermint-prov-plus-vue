<template>
    <!-- 主容器和用户列表容器   -->
    <div class="home">
    <div class="user-list">
    <h2>服务器列表</h2>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>IP</th>
          <th>Port</th>
          <th>Nodes</th>
          <th>可执行操作</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for指令遍历userList数组中的每个user对象，并为每个对象指定一个唯一的key -->
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.ip }}</td>
          <td>{{ user.port }}</td>
          <td>{{ user.nodenum }}</td>
          <td>
        <div class="user-actions">
            <el-button type="primary" @click="showUpdateDialog(user)">更新</el-button>
            <!-- 弹窗 -->
            <el-dialog
              title="更新服务器"
              :visible.sync="updateDialogVisible"
              width="30%"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
            >
      <el-form :model="editUser" label-width="80px">
        <el-form-item label="Id">
          <el-input v-model="editUser.id" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="editUser.name"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="editUser.ip"></el-input>
        </el-form-item>
        <el-form-item label="Keyword">
          <el-input v-model="editUser.keyword"></el-input>
        </el-form-item>
        <el-form-item label="Port">
          <el-input v-model.number="editUser.port"></el-input>
        </el-form-item>
        <el-form-item label="Nodes">
          <el-input v-model.number="editUser.nodenum"></el-input>
        </el-form-item>
      </el-form>
      <!-- 插槽（slot），用于放置弹窗底部的内容 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUser">确认</el-button>
      </div>
    </el-dialog>
          <el-button type="danger" @click="showDeleteConfirm(user.id)">删除</el-button>
          <el-dialog
      title="确认删除"
      :visible.sync="deleteDialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p>确定要删除该用户吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteUser()">确认</el-button>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
        </div>
      </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div class="list-actions">
    <el-button type="primary" @click="showAddDialog">添加服务器</el-button>
    <el-dialog
      title="添加服务器"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="newUser" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="newUser.ip"></el-input>
        </el-form-item>
        <el-form-item label="Keyword">
          <el-input v-model="newUser.keyword"></el-input>
        </el-form-item>
        <el-form-item label="Port">
          <el-input v-model.number="newUser.port"></el-input>
        </el-form-item>
        <el-form-item label="Nodes">
          <el-input v-model.number="newUser.nodenum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确认</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" @click="startJavaProgram">部署启动</el-button>
    </div>
    <!-- <div>
      <input type="number" v-model="hValue" placeholder="Enter h value" />
      <button @click="goWrite">灌入h个区块的数据</button>
    </div> -->
    </div>
    </template>
    
    
    
    <script>
    import axios from 'axios'; // axios用于发起HTTP请求
    
    export default {
    name: 'nodeManage',
    data() {
    return {
    userList: [],
    newUser: {
      name: '',
      ip: '',
      keyword:'',
      port: null,
      nodes: null
    },
    editUser: {
      id:null,
      name: '',
      ip: '',
      port: null,
      nodes: null
    },
    dialogVisible: false,
    updateDialogVisible: false,
    deleteDialogVisible: false,
    deletingUserId: null,
    hValue: 0, 
    };
    },
    mounted() {
    this.fetchUserList();
    },
    methods: {
    fetchUserList() {
      axios.get('http://localhost:8088/user', {
      withCredentials: true
      })
      .then(response => {
        this.userList = response.data;
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
    },
    resetForm() {
    this.newUser = {
      name: '',
      ip: '',
      port: null,
      nodes: null
    };
    },
    startJavaProgram() {
    // 发起HTTP POST请求
    axios.post('http://localhost:8088/TNodeStart') // 请求路径修改为/start
    .then(response => {
    console.log(response.data);
    this.$message.success('启动成功');
    })
    .catch(error => {
    console.error('Error starting Java program:', error);
    this.$message.error('发生错误');
    });
    },
    showAddDialog() {
    this.dialogVisible = true;
    this.updateDialogVisible = false;
    },
    addUser() {
    axios.post('http://localhost:8088/insert', this.newUser)
      .then(() => {
        this.$message.success('添加成功');
        this.fetchUserList(); // 添加成功后重新获取服务器列表
        this.resetForm();
        this.dialogVisible = false; // 关闭弹窗
      })
      .catch(error => {
        console.error('Error adding user:', error);
        this.$message.error('添加失败');
      });
    },
    showUpdateDialog(user) {
    this.editUser = { ...user };
    this.updateDialogVisible = true;
    this.dialogVisible = false;
    },
    updateUser() {
    axios.post('http://localhost:8088/update', this.editUser)
      .then(() => {
        this.$message.success('更新成功');
        this.fetchUserList(); 
        this.resetForm();
        this.updateDialogVisible = false;
      })
      .catch(error => {
        console.error('Error updating user:', error);
        this.$message.error('更新失败');
      });
    },
    showDeleteConfirm(userId) {
          this.deletingUserId = userId;
          this.deleteDialogVisible = true;
        },
    deleteUser() {
    axios.delete(`http://localhost:8088/delete/${this.deletingUserId}`)
      .then(() => {
        this.$message.success('删除成功');
              this.fetchUserList(); // 删除成功后重新获取用户列表
              this.deleteDialogVisible = false; // 关闭确认弹窗
            })
            .catch(error => {
              console.error('Error deleting user:', error);
              this.$message.error('删除失败');
      });
    },
    goWrite() {
          // 发送请求到后端
          axios.post('http://localhost:8088/api/write', { h: this.hValue })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
    
    
    }
    }
    </script>
    
    <style scoped>
    .user-actions {
      display: flex;
      justify-content: space-evenly;
    }
    .list-actions {
      display: flex;
      justify-content: space-evenly;
    }
    .user-list {
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    }
    .user-list h2 {
    margin-bottom: 15px;
    }
    table {
    width: 80%;
    border-collapse: separate;
    }
    th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    }
    th {
    background-color: #f2f2f2;
    }
    </style>