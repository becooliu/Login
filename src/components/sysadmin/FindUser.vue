<template>
    <div class="search-box">
        <el-input type="text" width="320px" v-model="searchString"   v-on:keyup.enter.native="findUser" placeholder="请输入查询用户名">
            <el-button slot="append" icon="el-icon-search" @click="findUser">查询</el-button>
        </el-input>
        <el-table
            :data="searchResult"
            style="width: 100%">
            <el-table-column
                prop="username"
                label="用户名"
                >
            </el-table-column>
            <el-table-column
                prop="ADMIN"
                label="是否管理员"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="userView(scope.row)">查看</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: 'FindUser',
        data(){
            return {
                searchString: '',
                resUserInfo: []
            }
        },
        methods: {
            
            handleSelect(item) {
                console.log(item)
            },
            userView(row){
                console.log(row)
            },
            findUser(){ //查询用户,
                let searchStr = this.searchString.trim().toLowerCase();
                if(searchStr !='' && searchStr != 'null' && searchStr != "undefined") {
                    this.$http.get('/api/sysadmin/getuser/'+searchStr)
                    .then(res => {
                        let resdata = res.body;
                        if(resdata.code == 'success') {
                            this.$message.success('查询成功');
                        }
                        resdata.data.isAdmin == true 
                        ? resdata.data.ADMIN = '是' 
                        : resdata.data.ADMIN = '否'
                        this.resUserInfo.push(resdata.data);
                        console.log(this.resUserInfo);
                        
                    }).catch(error => {
                        this.$message.error('用户查询失败，请稍后重试。')
                    })
                }
                this.resUserInfo = [];
            }
        },
        computed: {
            searchResult(){ //根据查询返回值，动态渲染查询结果表
                return this.resUserInfo;
            }
        }
    }
</script>
<style>
    .search-box {
        width: 480px;
    }
</style>
