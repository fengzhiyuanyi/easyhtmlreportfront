<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand font-weight-normal">
          <img class="logo sm_img" src="@/assets/APKCI.png" alt style="width: 80px;height: 20px">
        </a>
        <nav class="navbar-brand">
          <a class="p-2" @click="newTemplate">创建新模板</a>
          <a class="p-2" @click="jumpToAbout">关于
          </a>
        </nav>
      </div>
    </div>

    <div >
        <el-row class="tac">
            <el-col :span="3" :offset="1">
                <h5>APKCI平台/帮助</h5>
                <el-menu
                        default-active="0"
                        @select="tab"
                        class="el-menu-vertical-demo">
                    <el-menu-item index="0">
                        <i class="el-icon-info"></i>
                        <span slot="title">平台介绍</span>
                    </el-menu-item>
                    <el-submenu index="1.1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>常见问题</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1">初次使用</el-menu-item>
                            <el-menu-item index="2">常用操作</el-menu-item>
                            <el-menu-item index="3">特殊操作</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="4">
                        <i class="el-icon-question"></i>
                        <span slot="title">经验总结</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="18" :offset="1" style="padding-top: 50px">
                <div id="Introduce">
                    <h5>概述</h5>
                    <div class="second">
                        <p>APKCI是自动化测试平台，用户可以远程操控多台手机设备根据设置的脚本进行一系列模拟人工的操作，
                        旨在降低项目测试产生的人工成本和节省项目测试时间，让测试结果更直观的展现在用户面前。具体在于：</p>
                        <p>(1)让用户更直观地看到项目测试的结果</p>
                        <p>(2)让用户更为便捷地执行测试工作</p>
                        <p>(3)项目测试脚本复用，避免多次重复操作所产生的人工费用和时间损耗</p>
                        <p>(4)用户可同时设置多台设备同时进行同一操作，减少人工成本</p>
                    </div>
                    <h5>平台流程</h5>
                    <div class="second">
                        <p>创建模板-填写参数-选择设备-进行测试-收集Trace-反馈</p>
                    </div>
                    <h5>平台功能简介</h5>
                    <div class="second">
                        <p>项目基础信息：项目的基本参数：脚本地址，项目名称，下载方式，设备选择</p>
                        <p>设备管理：进行测试的设备</p>
                        <p>Trace收集：根据运行的结果，对Trace内容分析反馈给自动化测试编写的程序或者游戏程序</p>
                        <p>历史：可查看之前进行的测试结果和查看当前项目测试的进程，方便进行相关汇总</p>
                        <p>设备：历史页面中可点击相应的设备进行实时观看运行的情况</p>
                        <p>运行结果：用户可以直观的在测试结果页面中看到运行结果，运行时间和下载此次项目测试所产生的相关文件</p>
                    </div>
                </div>
                <div style="display:none" id="FirstUse">
                    <div class="first">
                        <h5>初次使用：</h5>
                    </div>
                    <div class="third">
                        <p class="title_text">1.创建模板</p>
                        <div class="img"><img src="@/assets/img/1.png" height="51" width="538"/></div>
                        <p class="title_text">2.填写标题</p>
                        <div class="img"><img src="@/assets/img/2.png" height="69" width="1146"/></div>
                        <p class="title_text">3.设置popo通知（选填，建议填写，以便于用户能够及时了解项目测试的结果）</p>
                        <div class="img"><img src="@/assets/img/3.png" height="65" width="1122"/></div>
                        <p class="title_text">4.填写PackageName（选填：为避免后台解析包出错，建议填写，而且下一步会用到）</p>
                        <div class="img"><img src="@/assets/img/4.png" height="73" width="1117"/></div>
                        <p class="title_text">5..填写APK下载地址：可勾选下载并安装选项</p>
                        <div class="fourth">
                            <p>（不填：不下载包体，需保证手机中有测试项目的包体
                                填写地址：选择url和TestEase</p>
                            <p> url:从填写的地址拉取包体</p>
                            <div class="img"><img src="@/assets/img/5.png" height="88" width="1129"/></div>
                            <p> TestEase</p>
                            <div class="img"><img src="@/assets/img/5.1.png" height="175" width="1126"/></div>
                            <div class="img"><img src="@/assets/img/testease1.png" height="77" width="542"/></div>
                            <div class="img"><img src="@/assets/img/testease1.1.png" height="140" width="620"/></div>
                        </div>
                        <p class="title_text">6.GIT_URL：填写需要运行的脚本地址</p>
                        <div class="img"><img src="@/assets/img/6.png" height="92" width="1121"/></div>
                        <p class="title_text">7.并发度：初始参数为0，代表全并发，一般无需要修改</p>
                        <div class="img"><img src="@/assets/img/7.png" height="89" width="1122"/></div>
                        <p class="title_text">8.设备选择：用户选择需要进行测试的设备</p>
                        <p>其中有全选，反选和刷新,设备列表中有设备的名称信息，使用状态，ip，标注，Serial等信息</p>
                        <div class="img"><img src="@/assets/img/8.png" height="407" width="1138"/></div>
                        <p class="title_text">9.Jenkins参数：基本无需改变</p>
                        <div class="img"><img src="@/assets/img/9.png" height="281" width="1130"/></div>
                        <p class="title_text">10.测试保存并运行：模板出现在模板列表中，开始进行测试</p>
                        <div class="img"><img src="@/assets/img/10.png" height="67" width="168"/></div>
                        <p class="title_text">11.历史：可查看执行此次测试的相关信息：</p>
                        <div class="fourth">
                            <p>设备列表：点击相应的设备名称可进入显示相应设备实时界面的网页,例子：特殊操作Q3</p>
                            <p>状态：显示测试结果，绿色图标可进入相应设备此次测试的log页面.例子：特殊操作Q6</p>
                            <p>运行时间：重跑按钮，会按照模板的设置重新进行此次测试工作，但是只保存重跑后的测试信息，
                                慎重使用,例子：特殊操作Q4</p>
                            <p>测试报告：会跳转至此次测试报告界面：截图；视频，测试数据和trace收集.例子：12上方链接跳转界面</p>
                            <p>报告总览：汇总进行此次测试的所有设备的运行情况</p>
                        </div>
                        <div class="img"><img src="@/assets/img/11.png" height="222" width="1142"/></div>
                        <p class="title_text">12.测试结果通知：填写popo通知的用户可收到测试结果，两条链接和一张项目测试结束前的最后一张截图以及设备名称信息和时间</p>
                        <div class="img"><img src="@/assets/img/12.png" height="509" width="486"/></div>
                        <div class="fourth">
                            <p>上方链接：进入测试报告界面</p>
                            <div class="img"><img src="@/assets/img/link_1.png" height="500"/></div>
                            <p>下方链接：跳转至显示设备实时界面的网站页面.例子：特殊操作Q3</p>
                        </div>
                    </div>
                </div>
                <div style="display:none" id="CommonOperation">
                    <div class="first">
                        <h5>常用使用：</h5>
                    </div>
                    <div class="third">
                        <p class="title_text">e1：修改popo的通知人，便于及时接受测试消息的结果</p>
                        <p class="title_text">e2：点击历史选项查看测试进度</p>
                        <p class="title_text">e3：点击历史选项中指定的设备查看测试报告</p>
                        <p class="title_text">e4:  点击模板列表中相应项目的配置按钮选择设备进行测试工作</p>
                    </div>
                </div>
                <div style="display:none" id="SpecialOperation">
                    <div class="first">
                        <h5>特殊操作：</h5>
                    </div>
                    <div class="third">
                        <p class="title_text">Q1：在模板中可选择任务执行的时间：延时，定时和指定时间执行，+按钮检查输入时间的格式和保存</p>
                        <div class="fourth">
                            <p>指定时间参数;五个参数</p>
                            <p>第一个*表示分钟，取值0~59</p>
                            <p>第二个*表示小时，取值0~23</p>
                            <p>第三个*表示一个月的第几天，取值1~31</p>
                            <p>第四个*表示第几月，取值1~12</p>
                            <p>第五个*表示一周中的第几天，取值0~7，其中0和7代表的都是周日</p>
                        </div>
                        <div class="img"><img src="@/assets/img/time.png" height="161" width="1148"/></div>
                        <p class="title_text">Q2：设备一直显示使用中或无法停止，可点击进入设备管理，使用alt+左键双击的操作释放相应的设备</p>
                        <div class="img"><img src="@/assets/img/Q2.png" height="47" width="543"/></div>
                        <p class="title_text">Q3：点击历史选项中的指定设备实时观看运行情况</p>
                        <div class="img"><img src="@/assets/img/q3.png" height="964" width="702"/></div>
                        <p class="title_text">Q4: 点击历史选项中的指定设备的状态中的重跑操作（有二次确认按钮）</p>
                        <div class="img">
                            <img src="@/assets/img/Q4.png" height="74" width="223"/>
                            <img src="@/assets/img/Q4.1.png" height="140" width="470"/></div>
                        <p class="title_text">Q5：模板列表中一键测试选中的项目</p>
                        <div class="img"><img src="@/assets/img/Q5.png" height="139" width="1118"/></div>
                        <p class="title_text">Q6：历史界面中状态信息中，点击图标可查看测试的相关配置和输出log,实时更新</p>
                        <div class="img"><img src="@/assets/img/Q6.png" height="43" width="1138"/></div>
                    </div>
                </div>
                <div style="display:none" id="Experience">
                    <div class="first">
                        <h5>经验总结：</h5>
                    </div>
                    <div class="second">
                        <p style="font-size: 17px"><strong>Q1：选择设备进行测试，设备没有反应?</strong></p>
                        <p>A1：选择设备时需要注意设备的状态，选用空闲的设备，否则造成阻塞，无法正常进行后续的测试工作</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/index.js'
export default {
  name: "About",
  data: function () {
    return {
      divNameList:["Introduce","FirstUse","CommonOperation","SpecialOperation","Experience"],
    }
  },
  methods: {
    tab (key, keyPath) {
        for (let i = 0; i <this.divNameList.length; i++) {
            if (i == parseInt(key)){
                document.getElementById(this.divNameList[i]).style.display=""
            }else {
                document.getElementById(this.divNameList[i]).style.display="none"
            }
        }
    },
    newTemplate(){
      this.$router.push({path: `/template/-`});
    },
    jumpToAbout(){
      this.$router.push({path: `/about`});
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 14px;
    line-height: 2.4;
    color: #333
  }
 .first{
      text-indent: 20px;
      font-size: 18px;
  }
  .second{
      text-indent: 40px;
      padding-left: 20px;
  }
  .third{
      text-indent: 80px;
  }
  .fourth{
      text-indent: 100px;
  }
  .img{
      padding-left: 5px;
  }
  .title_text{
      font-weight: 700;
      font-size: 17px;
  }
</style>
