<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-tabs v-model="tabs" align-with-title>
                    <v-tab @click="handleRiskType(item)" :href="'#'.concat(item)" v-for="item in riskType" :key="item">
                        {{item}}
                    </v-tab>
                    <v-tabs-slider color="pink"></v-tabs-slider>
                </v-tabs>
            </v-col>
        </v-row>
        <div class="row">
            <!-- <div class="col-lg-3">
                <AsideMenu />
            </div> -->
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-12">
                        <FormForEventsSearch v-on:gotoSearch="searchByCondition" :initData="params"/>
                    </div>
                    <div class="col-lg-12 res-list">
                        <PublishList :dataList="searchResultList" :tableHead="tableHead"></PublishList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
    import PublishList from "@/components/PublishList";
    // import AsideMenu from "@/components/Aside/Aside";
    import FormForEventsSearch from "@/components/FormForEventsSearch";
    export default {
        name: "EventsSearch",
        components: {
            PublishList,
            // AsideMenu,
            FormForEventsSearch
        },
        computed: {
            ...mapGetters(["currentUserPhoto"])
        },
        data() {
            return {
                searchResultList: [],
                tableHead: [
                    {
                        name: '事件名称',
                        property: 'title',
                        router: '/fkgHome/oneEventDetail/',
                        params: true,
                        sortAble: true,
                        currentSort: -1//0代表升序
                    },
                    {
                        name: '事件索引',
                        property: 'ID',
                        sortAble: true,
                        currentSort: -1//0代表升序
                    },
                    {
                        name: '相关对象',
                        property: 'subject',
                        sortAble: true,
                        maxLen:15,
                        currentSort: -1//0代表升序
                    },
                    {
                        name: '风险类型',
                        property: 'eventType',
                        sortAble: true,
                        currentSort: -1//0代表升序
                    },
                    {
                        name: '发生日期',
                        property: 'startTime',
                        sortAble: true,
                        time: true,
                        currentSort: -1//0代表升序
                    },
                    {
                        name: '操作',
                        property: 'oper',
                        sortAble: false,
                        currentSort: -1//0代表升序
                    }
                ],
                riskType: [
                    "全部", "信用风险", "保险风险", "市场风险", "流动性风险", "操作风险", "国别风险", "利率风险", "战略风险", "信息科技风险", "其他风险"
                ],
                currentRiskType: '',
                graphData: {},
                params:{"ID":"","startTime":{},"endTime":{},"or":{"content":[],"title":[]},"and":{"subject":[]}},
            };
        },
        mounted() {
            this.$store.dispatch(SET_BREADCRUMB, [{ title: "事件查询" }]);
        },
        methods: {
            async searchByCondition(params) {
                this.params = params;
                if (this.currentRiskType) {
                    this.params.and.eventType = [this.currentRiskType]
                } else {
                    this.params.and.eventType = []
                }
                console.log('start search', params);
                if (params) {
                    let res = await this.axios.post('/api/sykg/query/events_infos/keywords', params)
                    console.log(res)
                    if (res.data.status == 0) {
                        this.searchResultList = res.data.message.data;
                        this.searchResultSize = res.data.message.size;
                        this.currentStartId = 0;
                        console.log(this.searchResultIdList, this.searchResultSize)
                    }
                    // let res2 = await this.axios.post('/api/sykg/query/punish_infos/basic', {
                    //     IDs: this.searchResultIdList.slice(0, 100)
                    // })
                    // if (res2.data.status == 0) {
                    //     this.resultLawInfoList = res2.data.message.data;
                    //     this.resultLawInfoSize = res2.data.message.size;
                    // }
                    // this.currentStartId += 100;
                    // console.log(this.resultLawInfoList);
                }
            },

            handleRiskType(item) {
                // console.log(item)
                if (item == '全部') {
                    item = '';
                }
                this.currentRiskType = item;
                this.params.and.eventType = [item];
                this.searchByCondition(this.params);
            }
        },
        created() {
             //若路由参数中含有companyName字段，则将其作为相关对象进行搜索展示结果
             if(this.$route.query.companyName){
                console.log(this.$route.query.companyName)
                this.params.and.subject = [this.$route.query.companyName];
                this.searchByCondition(this.params);
            }
        },
    };
</script>
<style scoped>
    .row:nth-of-type(2),
    .res-list {
        margin-top: 20px;
    }
</style>