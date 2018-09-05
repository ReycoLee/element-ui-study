<template>
  <div class="view-page">
    <transition name="el-zoom-in-center">
      <div class="left-side" :class="{'left-side-collapsed':isCollapse}">
        <div class="left-side-inner">
          <router-link to="/" class="logo block">
            <img v-if="!isCollapse" src="../components/leftSlide/images/gray1.png" alt="汉腾汽车">
            <img v-if="isCollapse" src="../components/leftSlide/images/gray1.png" alt="汉腾汽车">
          </router-link>
          <div class="collapse-btn" @click="doCollapse()">
            <i class="fa fa-align-justify" :class="{'fa-rotate-90' :isCollapse}" aria-hidden="true"></i>
          </div>
          <div class="menu-container">
            <el-menu :collapse="isCollapse" class="menu-box" :unique-opened="true" @select="select" router :default-active="$route.activePath">
              <template v-for="(item, index) in nav_menu_data">
                <el-menu-item :title="isCollapse && item.title" class="menu-list" :key="index" v-if="typeof item.child === 'undefined'" v-show="!item.hidden" :index="item.path">
                  <i class="icon fa" :class="item.icon"></i>
                  <span v-text="item.title" class="text"></span>
                </el-menu-item>
                <el-submenu :title="isCollapse && item.title" :key="index" :index="item.path" v-else>
                  <template slot="title">
                    <i class="icon fa" :class="item.icon"></i>
                    <span v-text="item.title" class="text"></span>
                  </template>
                  <template v-for="(sub_item, sub_index) in item.child">
                    <el-menu-item class="menu-list menu-list-2" :index="sub_item.path" :key="sub_index" v-if="typeof sub_item.child === 'undefined'">
                      <span v-text="sub_item.title" class="text"></span>
                    </el-menu-item>
                    <el-submenu class="menu-list-2" :key="sub_index" :index="sub_item.path" v-else>
                      <template slot="title">
                        <span v-text="sub_item.title" class="text"></span>
                      </template>
                      <el-menu-item class="menu-list menu-list-3" v-for="(sub2_item, sub2_index) in sub_item.child" :index="sub2_item.path" :key="sub2_index">
                        <span v-text="sub2_item.title" class="text"></span>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                </el-submenu>

              </template>
            </el-menu>
          </div>
        </div>
      </div>
    </transition>
    <main-content>
      <router-view></router-view>
    </main-content>
  </div>

</template>
<script type="text/javascript">
import { mainContent } from "components";
import { setBtnBList } from "common/auth";
import { cookieStorage } from "common/storage";

export default {
  name: "page",
  data() {
    return {
      isCollapse: this.getCollapse(),
      icons: {
        系统管理: "fa-cog",
        字典管理: "fa-book",
        采番管理: "fa-code"
      },
      nav_menu_data: [],
      black_list: {},
      now_black_list: ""
    };
  },
  created() {
    this.load_data = true;
    this.nav_menu_data.push({
      title: "主页",
      path: "/home",
      icon: "fa-home"
    });

    this.$fetch.api_leftMenu
      .menuList()
      .then(({ data }) => {
        let pData = {};
        let fullPath = this.$router.history.current.fullPath;
        for (let i in data) {
          let menu = data[i];
          if (!menu.parent_code || menu.parent_code === "") {
            this.nav_menu_data.push({
              code: menu.code,
              title: menu.name,
              path:
                menu.uri.indexOf("#") === 0 ? "#" + Math.random() : menu.uri,
              icon: this.getIcon(menu.name)
            });
          } else {
            if (!pData[menu.parent_code]) {
              pData[menu.parent_code] = [];
            }
            pData[menu.parent_code].push({
              code: menu.code,
              title: menu.name,
              path:
                menu.uri.indexOf("#") === 0 ? "#" + Math.random() : menu.uri,
              icon: this.getIcon(menu.name)
            });
          }

          if (fullPath === menu.uri) {
            setBtnBList(menu.buttonblacklist);
          }

          this.black_list[menu.uri] = menu.buttonblacklist;
        }

        for (let i in this.nav_menu_data) {
          this.nav_menu_data[i].child = pData[this.nav_menu_data[i]["code"]];
          if (
            this.nav_menu_data[i].child &&
            this.nav_menu_data[i].child.length > 0
          ) {
            for (let j in this.nav_menu_data[i].child) {
              this.nav_menu_data[i].child[j].child =
                pData[this.nav_menu_data[i].child[j]["code"]];
            }
          }
        }

        this.load_data = false;
      })
      .catch(() => {
        this.load_data = false;
      });
  },
  methods: {
    getCollapse() {
      return cookieStorage.get("isCollapsed") === "1";
    },
    doCollapse() {
      this.isCollapse = !this.isCollapse;
      let millisecond = new Date().getTime();
      let expiresTime = new Date(millisecond + 60 * 60 * 1000 * 24 * 7);
      cookieStorage.set(
        "isCollapsed",
        this.isCollapse ? "1" : "0",
        expiresTime
      );
    },
    getIcon(data) {
      let icon = this.icons[data];
      if (!icon || icon === "") {
        icon = "fa-cog";
      }
      return icon;
    },
    select(index, indexPath) {
      setBtnBList(this.black_list[index]);
    }
  },
  components: {
    mainContent
  }
};
</script>
