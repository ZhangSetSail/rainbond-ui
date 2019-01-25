import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link, Switch, Route, routerRedux } from 'dva/router';
import { Row, Col, Card, Form, Button, Icon, Menu, Dropdown, notification, Select, Input, Modal } from 'antd';
import AddGroup from '../../components/AddOrEditGroup';
import globalUtil from '../../utils/global';
const { Option } = Select;
const { TextArea } = Input;


const formItemLayout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 19,
	},
};

@connect(({ user, global, loading }) => ({
	groups: global.groups,
	createAppByDockerrunLoading: loading.effects['createApp/createAppByDockerrun']
}), null, null, { withRef: true })

@Form.create()
export default class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			codeType: 'Git',
			showUsernameAndPass: false,
			showKey: false,
			addGroup: false
		}
	}
	onAddGroup = () => {
		this.setState({ addGroup: true })
	}
	cancelAddGroup = () => {
		this.setState({ addGroup: false })
	}
	handleAddGroup = (vals) => {
		const { setFieldsValue } = this.props.form;

		this.props.dispatch({
			type: 'groupControl/addGroup',
			payload: {
				team_name: globalUtil.getCurrTeamName(),
				...vals
			},
			callback: (group) => {

				if (group) {

					//获取群组
					this.props.dispatch({
						type: 'global/fetchGroups',
						payload: {
							team_name: globalUtil.getCurrTeamName(),
							region_name: globalUtil.getCurrRegionName(),
						},
						callback: () => {
							setFieldsValue({ group_id: group.ID });
							this.cancelAddGroup();
						}
					});
				}


			}
		})
	}
	hideShowKey = () => {
		this.setState({ showKey: false })
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const form = this.props.form;
		form.validateFields((err, fieldsValue) => {
			if (err) return;
			this.props.onSubmit && this.props.onSubmit(fieldsValue)
		});
	}
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { groups, createAppByDockerrunLoading } = this.props;
		const data = this.props.data || {};
		const showSubmitBtn = this.props.showSubmitBtn === void 0 ? true : this.props.showSubmitBtn;
		const showCreateGroup = this.props.showCreateGroup === void 0 ? true : this.props.showCreateGroup;

		return (
			<Fragment>
				<Form onSubmit={this.handleSubmit} layout="horizontal" hideRequiredMark>
					<Form.Item
						{...formItemLayout}
						label="应用"
					>
						{getFieldDecorator('group_id', {
							initialValue: (this.props.handleType && this.props.handleType === "Service") ? Number(this.props.groupId) : data.group_id,
							rules: [{ required: true, message: '请选择' }],
						})(
							<Select
								placeholder="请选择要所属应用"
								style={{ display: 'inline-block', width: (this.props.handleType && this.props.handleType === "Service") ? "" : 292, marginRight: 15 }}
								disabled={(this.props.handleType && this.props.handleType === "Service") ? true : false}
							>

								{
									(groups || []).map((group) => {
										return <Option value={group.group_id}>{group.group_name}</Option>
									})
								}
							</Select>
						)}
						{(this.props.handleType && this.props.handleType === "Service") ? null : showCreateGroup ? <Button onClick={this.onAddGroup}>新建应用</Button> : null}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						label="服务组件名称"
					>
						{getFieldDecorator('service_cname', {
							initialValue: data.service_cname || '',
							rules: [{ required: true, message: '要创建的服务组件还没有名字' }],
						})(
							<Input placeholder="请为创建的服务组件起个名字吧" />
						)}
					</Form.Item>

					<Form.Item
						{...formItemLayout}
						label="命令"
					>
						{getFieldDecorator('docker_cmd', {
							initialValue: data.docker_cmd || '',
							rules: [
								{ required: true, message: '请输入DockerRun命令' }
							],
						})(
							<TextArea placeholder="例如： docker run -d -p 8080:8080 -e PWD=1qa2ws --name=tomcat_demo tomcat" />
						)}
					</Form.Item>

					{
						showSubmitBtn ?
							<Form.Item
								wrapperCol={{
									xs: { span: 24, offset: 0 },
									sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
								}}
								label=""
							>
								{this.props.handleType && this.props.handleType === "Service" && this.props.ButtonGroupState ?
									this.props.handleServiceBotton(<Button onClick={this.handleSubmit} type="primary" loading={createAppByDockerrunLoading}>新建服务</Button>, false) :
									!this.props.handleType && <Button onClick={this.handleSubmit} type="primary" loading={createAppByDockerrunLoading}>新建应用</Button>
								}
							</Form.Item>
							: null
					}
				</Form>
				{this.state.addGroup && <AddGroup onCancel={this.cancelAddGroup} onOk={this.handleAddGroup} />}
			</Fragment>
		)
	}
}