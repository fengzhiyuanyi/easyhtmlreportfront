<template>
  <div>

    <el-dialog
      title="提示"
      :visible.sync="mDialogVisible"
      width="30%">
      <span>{{mAlertTip}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mDialogVisible=false">取 消</el-button>
        <el-button @click="alertConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand font-weight-normal">
          <img class="logo sm_img" src="@/assets/APKCI.png" alt style="width: 80px;height: 20px">
        </a>
        <nav class="navbar-brand pull-right">
          <a class="p-2" href="#"><strong>模版列表</strong></a>
          <a class="p-2" @click="newTemplate">创建新模板</a>
          <a class="p-2 " target="_blank" href="http://wifiphone.nie.netease.com">
            设备管理 <i class="fa fa-external-link"></i>
          </a>
          <a class="p-2" target="_blank" href="http://10.246.46.160:8080/job/K-apk-onephone-test-pipeline/">
            Jenkins <i class="fa fa-external-link"></i>
          </a>
          <a class="p-2" href="/about">关于
            <span class="sr-only"></span>
          </a>
          <a class="p-2" href="/logout">退出
            <span class="sr-only"></span>
          </a>
        </nav>
      </div>
    </div>
    <div class="container">

      <el-table
        :data="templates"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="创建人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="项目类别"
          width="150"
          :filters="[{ text: '兼容性', value: 'compatibility' }, { text: 'Monkey', value: 'monkey' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '兼容性' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="400">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-caret-right">一键测试</el-button>
            <el-button size="mini" icon="el-icon-setting" @click="jumpToTemplate(scope.row.id)">
              配置
            </el-button>
            <el-button size="mini" icon="el-icon-time" @click="jumpToHistory(scope.row.id)">历史</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"
                       @click.native.prevent="deleteTemplate(scope.$index, templates)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <p class="text-right">&copy;Copyright Netease-game 2018</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        templates: [],
        mDialogVisible: false,
        mAlertTip: "",
        currentRow: 0
      }
    },
    mounted: function () {
      var _this = this
      $.ajax({
        url: "http://10.240.169.75:7000",
        type: "get",
        success: function (result) {
          if (result.success) {
            for (let t of result.templates) {
              t.createdAt = _this.timeSince(t.createdAt)
              t.tag = '兼容性'
            }
            _this.templates = result.templates
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    },
    methods: {
      timeSince(time) {
        return this.moment(time).fromNow();
      },
      deleteTemplate(index, rows) {
        this.mAlertTip = "确认删除 \"" + rows[index].title + "\" ?"
        this.mDialogVisible = true
        this.currentRow = index;
      },
      alertConfirm() {
        $.ajax({
          method: "delete",
          url: "http://10.240.169.75:7000/templates/" + this.templates[this.currentRow].id,
        })
          .done(function (ret) {
            this.mDialogVisible = false;
            if (ret.success) {
              this.templates.splice(this.currentRow, 1);
            } else {
              alert(ret.mesg);
            }
          }.bind(this))
          .fail(function (xhr, status, err) {
            this.mDialogVisible = false;
            alert("删除失败: " + status + " " + err)
          });

      },
      filterTag(value, row) {
        return row.tag === value;
      },
      jumpToTemplate(id) {
        this.$router.push({path: `/template/${id}`})
      },
      jumpToHistory(id){
        this.$router.push({path: `/history/${id}`})
      },
      newTemplate(){
        this.$router.push({path: `/template/-`});
      }

    },
    created: function () {

    }
  }
</script>

<style scoped>

  .vue-title > i {
    display: none;
  }

  nav a {
    font-size: small;
    color: #777;
  }

  .vue-title:hover > i {
    display: inline-block;
  }

  span .el-button {
    padding: 0;
  }
</style>
