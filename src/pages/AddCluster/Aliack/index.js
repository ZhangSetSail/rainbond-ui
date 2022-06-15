/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { Button, Card, Form, Input, Row, Steps } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Qs from 'qs';
import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import userUtil from '../../../utils/user';
import DAinput from '../component/node';
import styles from './index.less';

const FormItem = Form.Item;
const { Step } = Steps;
const dataObj = {
  enableHA: false,
  gatewayIngressIPs: '',
  imageHub: {
    enable: false,
    domain: '',
    namespace: '',
    username: '',
    password: ''
  },
  etcd: {
    enable: false,
    endpoints: [],
    secretName: ''
  },
  estorage: {
    enable: false,
    type:'aliyun',
    RWX: {
      enable: false,
      config: {
        server:'',
        storageClassName: ''
      }
    },
    RWO: {
      enable: false,
      storageClassName: ''
    }
  },
  database: {
    enable: false,
    uiDatabase: {
      host: '',
      port: '',
      username: '',
      password: '',
      dbname: '',
      enable: false
    },
    regionDatabase: {
      host: '',
      port: '',
      username: '',
      password: '',
      dbname: '',
      enable: false
    }
  },
  nodesForChaos: {
    enable: false,
    nodes: []
  },
  nodesForGateway: {
    enable: true,
    nodes: []
  }
};
@Form.create()
@connect(({ user, list, loading, global, index, region }) => ({
  user: user.currentUser,
  list,
  loading: loading.models.list,
  rainbondInfo: global.rainbondInfo,
  enterprise: global.enterprise,
  isRegist: global.isRegist,
  oauthLongin: loading.effects['global/creatOauth'],
  overviewInfo: index.overviewInfo,
  baseConfiguration: region.base_configuration
}))
export default class ClusterLink extends PureComponent {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const adminer = userUtil.isCompanyAdmin(user);
    this.state = {
      adminer
    };
  }
  componentWillMount() {
    const { adminer } = this.state;
    const { dispatch } = this.props;
    if (!adminer) {
      dispatch(routerRedux.push(`/`));
    }
  }
  componentDidMount() {}
  loadSteps = () => {
    const steps = [
      {
        title: '基本配置'
      },
      {
        title: '高级配置'
      },
      {
        title: '执行安装'
      },
      {
        title: '对接集群'
      }
    ];
    return steps;
  };
  handleSubmit = e => {};
  // 下一步或者高级配置
  toLinkNext = value => {
    const { dispatch } = this.props;
    const {
      match: {
        params: { eid }
      }
    } = this.props;

    // 获取表单的值
    this.props.form.validateFields((err, values) => {
      // const {
      //   baseConfiguration: { nodesForGateway }
      // } = this.props;
      // if (
      //   values &&
      //   (!values.nodesForGateway || values.nodesForGateway.length === 0) &&
      //   nodesForGateway &&
      //   nodesForGateway.length > 0
      // ) {
      //   values.nodesForGateway = nodesForGateway;
      //   err = null;
      // }

      if (err) return;

      if (values) {
        dataObj.gatewayIngressIPs = values.gatewayIngressIPs || '';
        // 镜像仓库
        dataObj.imageHub.enable = true;
        dataObj.imageHub.domain = values.domain || '';
        dataObj.imageHub.namespace = values.namespace || '';
        dataObj.imageHub.username = values.username || '';
        dataObj.imageHub.password = values.password || '';
        dataObj.etcd.endpoints = values.endpoints || [];
        dataObj.etcd.secretName = values.secretName || '';
        // 存储
        dataObj.estorage.enable = true;
        dataObj.estorage.RWX.enable = true;
        dataObj.estorage.RWO.enable = true;
        dataObj.estorage.RWX.config.server =
          values.server || '';
        dataObj.estorage.RWO.storageClassName = values.storageClassName2 || '';
        // 数据库
        dataObj.database.enable = true;
        dataObj.database.regionDatabase.enable = true;
        dataObj.database.regionDatabase.host = values.regionDatabase_host || '';
        dataObj.database.regionDatabase.port = values.regionDatabase_port || '';
        dataObj.database.regionDatabase.username =
          values.regionDatabase_username || '';
        dataObj.database.regionDatabase.password =
          values.regionDatabase_password || '';
        dataObj.database.regionDatabase.dbname =
          values.regionDatabase_dbname || '';
      }
      // 存基本设置数据
      dispatch({
        type: 'region/saveBaseConfiguration',
        payload: values
      });
    });
    // 页面跳转高级配置
    if (value === 'advanced') {
      router.push({
        pathname: `/enterprise/${eid}/provider/ACksterList/advanced`,
        search: Qs.stringify({ data: dataObj, name: 'ack' })
      });
    } else {
      // 跳转下一步
      router.push({
        pathname: `/enterprise/${eid}/provider/ACksterList/install`,
        search: Qs.stringify({
          data: dataObj,
          name: 'ack',
          step: 'base'
        })
      });
    }
  };

  render() {
    const {
      match: {
        params: { eid, provider, clusterID }
      },
      form: { getFieldDecorator },
      baseConfiguration: { gatewayIngressIPs }
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 }
      },
      wrapperCol: {
        xs: { span: 5 },
        sm: { span: 5 }
      }
    };
    const storageFormItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 7 },
        sm: { span: 7 }
      }
    };
    const formItemLayouts = {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      }
    };

    return (
      <PageHeaderLayout
        title="添加集群"
        content="集群是资源的集合，以Kubernetes集群为基础，部署平台Region服务即可成为平台集群资源。"
      >
        {/* 步骤 */}
        <Row style={{ marginBottom: '16px' }}>
          <Steps current={0}>
            {this.loadSteps().map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Row>
        {/* 配置 */}
        <Card style={{ padding: '24px 12px' }}>
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.base_configuration}>
              {/* 入口IP */}
              <Row className={styles.antd_row}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    入口访问IP
                  </span>
                </div>
                <FormItem {...formItemLayout} className={styles.antd_form}>
                  {getFieldDecorator('gatewayIngressIPs', {
                    initialValue: gatewayIngressIPs || '',
                    rules: [
                      {
                        required: true,
                        message: '请填写IP地址'
                      }
                      // {
                      //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                      //   message: '请填写正确的域名格式，支持泛域名'
                      // }
                    ]
                    // initialValue: editInfo.domain_name
                  })(<Input placeholder="请输入IP地址  例：1.2.3.4" />)}
                </FormItem>
              </Row>
              {/* 网关安装节点 */}
              <Row className={styles.antd_row}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    网关安装节点
                  </span>
                </div>
                <FormItem {...formItemLayout} className={styles.antd_form}>
                  {getFieldDecorator('nodesForGateway', {
                    rules: [
                      {
                        required: true,
                        message: '请添加域名'
                      }
                      // {
                      //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                      //   message: '请填写正确的域名格式，支持泛域名'
                      // }
                    ]
                    // initialValue: editInfo.domain_name
                  })(<DAinput />)}
                </FormItem>
              </Row>
              <Row className={styles.antd_rows}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>
                    <span className={styles.titleSpan}>NAS 存储</span>
                  </div>
                </div>
                <div className={styles.config}>
                  <FormItem
                    {...storageFormItemLayout}
                    label="挂载点地址"
                  >
                    {getFieldDecorator('server', {
                      rules: [
                        {
                          required: true,
                          message: '请添加域名'
                        }
                      ]
                      // initialValue: editInfo.domain_name
                    })(
                      <Input placeholder="请输入存储名称  例：glusterfs-simple" />
                    )}
                  </FormItem>
                  <FormItem
                    {...storageFormItemLayout}
                    label="RWO 所用存储 storageClass 名称"
                  >
                    {getFieldDecorator('storageClassName2', {
                      rules: [
                        {
                          required: true,
                          message: '请添加域名'
                        }
                      ]
                      // initialValue: editInfo.domain_name
                    })(
                      <Input placeholder="请输入存储名称  例：glusterfs-simple" />
                    )}
                  </FormItem>
                </div>
              </Row>
              {/* 数据库 */}
              <Row className={styles.antd_rows}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>
                    <span className={styles.titleSpan}>RDS 数据库</span>
                  </div>
                </div>
                <div className={styles.config}>
                  {/* 连接地址 */}
                  <FormItem {...formItemLayouts} label="连接地址">
                    {/* 控制台数据库 */}
                    {getFieldDecorator('regionDatabase_host', {
                      rules: [
                        {
                          required: true,
                          message: '请输入数据库连接地址'
                        }
                        // {
                        //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                        //   message: '请填写正确的域名格式，支持泛域名'
                        // }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入数据库连接地址" />)}
                  </FormItem>
                  {/* 连接端口 */}
                  <FormItem {...formItemLayouts} label="连接端口">
                    {/* 控制台数据库 */}
                    {getFieldDecorator('regionDatabase_port', {
                      rules: [
                        {
                          required: true,
                          message: '请输入连接端口'
                        }
                        // {
                        //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                        //   message: '请填写正确的域名格式，支持泛域名'
                        // }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入连接端口  例：3306" />)}
                  </FormItem>
                  {/* 用户名 */}
                  <FormItem {...formItemLayouts} label="用户名">
                    {/* 控制台数据库 */}
                    {getFieldDecorator('regionDatabase_username', {
                      rules: [
                        {
                          required: true,
                          message: '请输入用户名'
                        }
                        // {
                        //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                        //   message: '请填写正确的域名格式，支持泛域名'
                        // }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入用户名  例：root" />)}
                  </FormItem>
                  {/* 密码 */}
                  <FormItem {...formItemLayouts} label="密码">
                    {/* 控制台数据库 */}
                    {getFieldDecorator('regionDatabase_password', {
                      rules: [
                        {
                          required: true,
                          message: '请输入密码'
                        }
                        // {
                        //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                        //   message: '请填写正确的域名格式，支持泛域名'
                        // }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入密码" />)}
                  </FormItem>
                  {/* 数据库名称 */}
                  <FormItem {...formItemLayouts} label="数据库名称">
                    {/* 控制台数据库 */}
                    {getFieldDecorator('regionDatabase_dbname', {
                      rules: [
                        {
                          required: true,
                          message: '内容不能为空'
                        }
                        // {
                        //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                        //   message: '请填写正确的域名格式，支持泛域名'
                        // }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入数据库库名称  例：region" />)}
                  </FormItem>
                </div>
              </Row>
              {/* 镜像仓库 */}
              <Row className={styles.antd_rows}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>
                    <span className={styles.titleSpan}>容器镜像服务</span>
                  </div>
                </div>
                <div className={styles.config}>
                  <FormItem
                    {...formItemLayouts}
                    label="镜像仓库域名"
                    className={styles.antd_form}
                  >
                    {getFieldDecorator('domain', {
                      rules: [
                        {
                          required: true,
                          message: '请添加域名'
                        }
                        // {
                        //   pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                        //   message: '请填写正确的域名格式，支持泛域名'
                        // }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入镜像仓库域名" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayouts}
                    label="命名空间"
                    className={styles.antd_form}
                  >
                    {getFieldDecorator('namespace', {
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入命名空间" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayouts}
                    label="用户名"
                    className={styles.antd_form}
                  >
                    {getFieldDecorator('username', {
                      rules: [
                        {
                          required: true,
                          message: '请输入用户名'
                        }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入用户名" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayouts}
                    label="密码"
                    className={styles.antd_form}
                  >
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: '请输入密码'
                        }
                      ]
                      // initialValue: editInfo.domain_name
                    })(<Input placeholder="请输入密码" />)}
                  </FormItem>
                </div>
              </Row>
            </div>
            <Row>
              <FormItem className={styles.antd_row_btn}>
                <Button
                  className={styles.antd_btn}
                  type="primary"
                  onClick={() => {
                    this.props.dispatch(
                      routerRedux.push(`/enterprise/${eid}/addCluster`)
                    );
                  }}
                >
                  返回
                </Button>
                <Button
                  className={styles.antd_btn}
                  type="primary"
                  onClick={() => {
                    this.toLinkNext('advanced');
                  }}
                >
                  高级配置
                </Button>
                <Button
                  className={styles.antd_btn}
                  type="primary"
                  onClick={() => {
                    this.toLinkNext('next');
                  }}
                >
                  下一步
                </Button>
              </FormItem>
            </Row>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
