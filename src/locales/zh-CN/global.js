// 位置：utils > global 组件运行状态翻译

const global = {
    // fetchStateText 函数下的变量
    'global.fetchStateText.RUNNING':'运行中',
    'global.fetchStateText.running':'运行中',
    'global.fetchStateText.starting':'启动中',
    'global.fetchStateText.checking':'检测中',
    'global.fetchStateText.stopping':'关闭中',
    'global.fetchStateText.unusual':'运行异常',
    'global.fetchStateText.closed':'已关闭',
    'global.fetchStateText.undeploy':'未部署',
    'global.fetchStateText.unKnow':'未知',
    'global.fetchStateText.UNKNOWN':'未知',
    'global.fetchStateText.ABNORMAL':'运行异常',
    'global.fetchStateText.TEMINATING':'关闭中',
    'global.fetchStateText.INITIATING':'等待启动',
    'global.fetchStateText.SCHEDULING':'调度中',
    'global.fetchStateText.TheInternet':'未知',
    'global.fetchStateText.upgrade':'升级中',
    'global.fetchStateText.creating':'部署中',
    'global.fetchStateText.expired':'过期',
    'global.fetchStateText.NOTREADY':'未就绪',
    'global.fetchStateText.UNHEALTHY':'不健康',
    'global.fetchStateText.succeeded':'已完成',
    'global.fetchStateText.failed':'执行失败',
    'global.fetchStateText.SUCCEEDED':'已完成',

    // fetchGovernanceMode
    'global.fetchGovernanceMode.KUBERNETES_NATIVE_SERVICE':'原生 service 模式',
    'global.fetchGovernanceMode.BUILD_IN_SERVICE_MESH':'内置 ServiceMesh 模式',
    'global.fetchGovernanceMode.ISTIO_SERVICE_MESH':'Istio治理模式',

    // fetchTime
    'global.fetchTime.day':'{num}天',
    'global.fetchTime.hour':'{num}小时',
    'global.fetchTime.minute':'{num}分钟',
    'global.fetchTime.second':'{num}秒',
    'global.fetchTime.second.one':'1秒',
    'global.fetchTime.day.ago':'{num}天前',
    'global.fetchTime.hour.ago':'{num}小时前',
    'global.fetchTime.minute.ago':'{num}分钟前',
    'global.fetchTime.second.ago':'{num}秒前',
    'global.fetchTime.second.ago.one':'1秒前',

    // fetchInstanceReasons
    'global.fetchInstanceReasons.UnknownContainerStatuses':'未知的容器状态',
    'global.fetchInstanceReasons.ContainersNotReady':'容器未就绪',
    'global.fetchInstanceReasons.ContainersNotInitialized':'容器尚未初始化',

    // fetchInstanceAdvice
    'global.fetchInstanceAdvice.OutOfMemory':'内存不足, 建议为程序分配更多内存, 或检查程序是否合理使用内存',
    'global.fetchInstanceAdvice.Unhealthy':'健康检测不通过, 请检查程序的端口是否可用, 以及健康检测配置是否正确',
    'global.fetchInstanceAdvice.Initiating':'等待启动中, 请检查该组件所依赖的组件是否已经正常启动',

    // fetchOperation
    'global.fetchOperation.doing':'进行中',
    'global.fetchOperation.timeOut':'操作已超时',
    'global.fetchOperation.success':'成功',
    'global.fetchOperation.lose':'失败',

    // fetchReason
    'global.fetchReason.tenant_lack_of_memory':'超过租户限额',
    'global.fetchReason.cluster_lack_of_memory':'集群资源不足',

    // fetchAccessText
    'global.fetchAccessText.component':'组件管理',
    'global.fetchAccessText.app':'应用管理',
    'global.fetchAccessText.gatewayRule':'网关访问策略',
    'global.fetchAccessText.certificate':'证书管理',
    'global.fetchAccessText.plugin':'插件管理',
    'global.fetchAccessText.teamMember':'团队成员管理',
    'global.fetchAccessText.teamRole':'团队角色管理',
    'global.fetchAccessText.teamRegion':'团队集群管理',

    // getComponentType
    'global.getComponentType.stateless_multiple':'无状态服务(Deployment类型)',
    'global.getComponentType.state_singleton':'有状态服务(Statefulset类型)',
    'global.getComponentType.stateless_singleton':'无状态服务(Deployment类型)',
    'global.getComponentType.state_multiple':'有状态服务(Statefulset类型)',
    'global.getComponentType.job':'任务(Job类型)',
    'global.getComponentType.cronjob':'周期性任务(Cronjob类型)',

    // getSupportComponentTyps
    'global.getSupportComponentTyps.stateless_multiple':'部署为无状态服务(Deployment类型),一般用于Web类、API类等组件。',
    'global.getSupportComponentTyps.state_multiple':'部署为有状态服务(Statefulset类型),一般用于DB类、消息中间件类、数据类组件。',
    'global.getSupportComponentTyps.job':'部署为任务(Job类型),一般用于一次性任务,完成后容器就退出。',
    'global.getSupportComponentTyps.cronjob':'部署为周期性任务(Cronjob类型),一般用于处理周期性的、需反复执行的定时任务。',

    // fetchStateOptTypeText
    'global.fetchStateOptTypeText.deploy':'构建组件',
    'global.fetchStateOptTypeText.delete':'删除组件',
    'global.fetchStateOptTypeText.HorizontalUpgrade':'水平升级',
    'global.fetchStateOptTypeText.VerticalUpgrade':'垂直升级',
    'global.fetchStateOptTypeText.create':'创建组件',
    'global.fetchStateOptTypeText.callback':'回滚',
    'global.fetchStateOptTypeText.git-change':'代码仓库修改',
    'global.fetchStateOptTypeText.own_money':'欠费关闭',
    'global.fetchStateOptTypeText.add_label':'添加标签',
    'global.fetchStateOptTypeText.delete_label':'删除标签',
    'global.fetchStateOptTypeText.service_state':'应用状态修改',
    'global.fetchStateOptTypeText.reboot':'重启组件',
    'global.fetchStateOptTypeText.market_sync':'云市同步',
    'global.fetchStateOptTypeText.truncate':'删除组件',
    'global.fetchStateOptTypeText.EventTypeAbnormalExited':'组件异常退出',
    'global.fetchStateOptTypeText.OOMKilled':'发生OOM',
    'global.fetchStateOptTypeText.LivenessProbeFailed':'健康检查不通过(重启)',
    'global.fetchStateOptTypeText.ReadinessProbeFailed':'健康检查不通过(下线)',
    'global.fetchStateOptTypeText.AbnormalShtdown':'组件异常退出',
    'global.fetchStateOptTypeText.AbnormalExited':'组件异常退出',
    'global.fetchStateOptTypeText.AbnormalRecovery':'恢复正常',
    'global.fetchStateOptTypeText.create-service':'创建组件',
    'global.fetchStateOptTypeText.batch-build-service':'批量构建组件',
    'global.fetchStateOptTypeText.batch-start-service':'批量启动组件',
    'global.fetchStateOptTypeText.batch-stop-service':'批量停止组件',
    'global.fetchStateOptTypeText.batch-upgrade-service':'批量升级组件',
    'global.fetchStateOptTypeText.build-service':'构建组件',
    'global.fetchStateOptTypeText.build':'构建组件',
    'global.fetchStateOptTypeText.upgrade':'滚动升级组件',
    'global.fetchStateOptTypeText.update-service':'更新组件部署类型',
    'global.fetchStateOptTypeText.start-service':'启动组件',
    'global.fetchStateOptTypeText.start':'启动组件',
    'global.fetchStateOptTypeText.add-app-autoscaler-rule':'添加自动伸缩规则',
    'global.fetchStateOptTypeText.update-app-autoscaler-rule':'更新自动伸缩规则',
    'global.fetchStateOptTypeText.stop-service':'停止组件',
    'global.fetchStateOptTypeText.stop':'停止组件',
    'global.fetchStateOptTypeText.restart-service':'重启组件',
    'global.fetchStateOptTypeText.restart':'重启组件',
    'global.fetchStateOptTypeText.vertical-service':'垂直扩展组件',
    'global.fetchStateOptTypeText.vertical':'垂直扩展组件',
    'global.fetchStateOptTypeText.horizontal-service':'水平扩展组件',
    'global.fetchStateOptTypeText.horizontal':'水平扩展组件',
    'global.fetchStateOptTypeText.stop-tennant':'停止租户',
    'global.fetchStateOptTypeText.set-language':'设置组件语言',
    'global.fetchStateOptTypeText.delete-service':'删除组件',
    'global.fetchStateOptTypeText.upgrade-service':'升级组件',
    'global.fetchStateOptTypeText.delete-buildversion':'删除构建版本',
    'global.fetchStateOptTypeText.share-service':'发布组件',
    'global.fetchStateOptTypeText.share-wb':'发布到内部市场',
    'global.fetchStateOptTypeText.share-ws':'发布到云端市场',
    'global.fetchStateOptTypeText.share-yb':'发布到市场',
    'global.fetchStateOptTypeText.share-ys':'发布到市场',
    'global.fetchStateOptTypeText.updata':'更新组件',
    'global.fetchStateOptTypeText.add-app-service-monitor':'添加监控点',
    'global.fetchStateOptTypeText.add-service-dependency':'添加组件依赖',
    'global.fetchStateOptTypeText.delete-service-dependency':'删除组件依赖',
    'global.fetchStateOptTypeText.add-service-env':'添加组件环境变量',
    'global.fetchStateOptTypeText.update-service-env':'更新组件环境变量',
    'global.fetchStateOptTypeText.delete-service-env':'删除组件环境变量',
    'global.fetchStateOptTypeText.add-service-port':'添加组件端口',
    'global.fetchStateOptTypeText.update-service-port-old':'更新组件端口',
    'global.fetchStateOptTypeText.update-service-port':'更新组件端口',
    'global.fetchStateOptTypeText.delete-service-port':'删除组件端口',
    'global.fetchStateOptTypeText.handle-service-outerport':'修改组件对外端口',
    'global.fetchStateOptTypeText.handle-service-innerport':'修改组件对内端口',
    'global.fetchStateOptTypeText.change-service-lbport':'修改组件LB端口',
    'global.fetchStateOptTypeText.rollback-service':'回滚',
    'global.fetchStateOptTypeText.add-service-volume':'添加组件持久化存储',
    'global.fetchStateOptTypeText.update-service-volume':'更新组件持久化存储',
    'global.fetchStateOptTypeText.delete-service-volume':'删除组件持久化存储',
    'global.fetchStateOptTypeText.add-service-depvolume':'添加组件依赖存储',
    'global.fetchStateOptTypeText.delete-service-depvolume':'删除组件依赖存储',
    'global.fetchStateOptTypeText.add-service-probe':'添加组件探针',
    'global.fetchStateOptTypeText.update-service-probe':'更新组件探针',
    'global.fetchStateOptTypeText.delete-service-probe':'删除组件探针',
    'global.fetchStateOptTypeText.add-service-label':'添加组件标签',
    'global.fetchStateOptTypeText.update-service-label':'更新组件标签',
    'global.fetchStateOptTypeText.delete-service-label':'删除组件标签',
    'global.fetchStateOptTypeText.add-thirdpart-service':'添加第三方组件',
    'global.fetchStateOptTypeText.update-thirdpart-service':'更新第三方组件',
    'global.fetchStateOptTypeText.delete-thirdpart-service':'删除第三方组件',
    'global.fetchStateOptTypeText.update-service-gateway-rule':'更新组件网关规则',
    'global.fetchStateOptTypeText.app-restore-envs':'重新加载应用环境变量',
    'global.fetchStateOptTypeText.app-restore-ports':'重新加载应用端口',
    'global.fetchStateOptTypeText.app-restore-volumes':'重新加载应用存储',
    'global.fetchStateOptTypeText.app-restore-probe':'重新加载应用探针',
    'global.fetchStateOptTypeText.app-restore-deps':'重新加载应用依赖',
    'global.fetchStateOptTypeText.app-restore-depvols':'重新加载应用依赖存储',
    'global.fetchStateOptTypeText.app-restore-plugins':'重新加载应用插件',
    'global.fetchStateOptTypeText.create-service-plugin':'创建组件插件',
    'global.fetchStateOptTypeText.update-service-plugin':'更新组件插件',
    'global.fetchStateOptTypeText.delete-service-plugin':'删除组件插件',
    'global.fetchStateOptTypeText.update-service-plugin-config':'更新组件插件配置',
    'global.fetchStateOptTypeText.delete-component-k8s-attributes':'删除 k8s 属性',
    'global.fetchStateOptTypeText.update-component-k8s-attributes':'更新 k8s 属性',
    'global.fetchStateOptTypeText.create-component-k8s-attributes':'创建 k8s 属性',
    'global.fetchStateOptTypeText.Unschedulable':'不可调度',
    'global.fetchStateOptTypeText.start':'等待启动',
    'global.fetchStateOptTypeText.error':'运行异常',
    'global.fetchStateOptTypeText.up':'挂起',
    'global.fetchStateOptTypeText.recover':'恢复',
}
export default Object.assign({}, global);
