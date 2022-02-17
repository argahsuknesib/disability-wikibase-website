import { AudioOutlined } from '@ant-design/icons';
import { AutoComplete, Card, Col, Input, Menu, Row, Typography, message } from 'antd';
import TweenOne from 'rc-tween-one';
import React from 'react';
import QAService from '../../../services/QAService';


const { Item, SubMenu } = Menu;

const { Title, Text, Link } = Typography;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

// SEARCH RESULTS TAB
const tabList = [
    {
        key: 'Text',
        tab: 'Text',
    },
    {
        key: 'Table',
        tab: 'Table',
    },
    {
        key: 'Graph',
        tab: 'Graph',
    },
];


class QASearch extends React.Component {


    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            phoneOpen: undefined,
            username: "",
            password: "",
            token: "",
            loggedUserName: "",
            loggedIn: false,
            key: 'Text',
            searchKey: '',
            autocomplete_options: [],
            answered: false,
            contentList: [],
            textAnswer: [],
            entitySummaryList: []

        };
    }

    phoneClick = () => {
        const phoneOpen = !this.state.phoneOpen;
        this.setState({
            phoneOpen,
        });
    };
    componentDidMount() {
        let contentList = {
            'Text': <p>content1</p>,
            'Table': <p>content2</p>,
            'Graph': <p>content3</p>,
        };
        this.setState({ contentList })
        this.searchInput.current.focus();
        if (this.props.location.state && this.props.location.state.keyword !== '') {
            this.setState({ searchKey: this.props.location.state.keyword })
            this.onSearch(this.props.location.state.keyword)
        }
    }

    getEntityProperty = (uri) => {
        if (!uri) return;
        QAService.getEntityProperty(uri)
            .then(res => {
                let props = []
                res.data.facts.forEach(prop => {
                    props.push({
                        'subject': res.data.subject,
                        'object': prop.object,
                        'predicate': prop.predicate
                    })
                })
                this.setState({ entitySummaryList: props })
            })
            .catch(err => {
                console.log(err)
            })
    }


    onSearch = value => {
        this.setState({ textAnswer: [], entitySummaryList: [], answered: false })
        if (!value)
            return;
        QAService.query(value)
            .then(res => {
                if (res.data && res.data.qaContexts) {
                    let data = res.data.qaContexts.qaContext
                    let textAnswer = []
                    data.forEach(elem => {
                        if (elem.label || elem.literal || elem.description) {
                            textAnswer.push({ 'label': elem.label, 'description': elem.description, 'link': elem.links[elem.kb], 'literal': elem.literal })
                            this.getEntityProperty(elem.links[elem.kb])
                        }
                    })
                    this.setState({ textAnswer, answered: true })
                }
            })
            .catch(err => {
                message.error({
                    content: 'Something went wrong ' + err,
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                });
            })
    }

    onSelect = (data) => {
        this.setState({ searchKey: data })
    };

    onChange = e => {
        this.setState({ searchKey: e.target.value })
        QAService.autocomplete(e.target.value)
            .then(res => {
                let option = [];
                if (res.data === "") {
                    return;
                }
                res.data.forEach(elem => {
                    option.push({ 'value': elem.key })
                })
                this.setState({ autocomplete_options: option })

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleMenuClick(value) {
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    renderSummary = (answer) => {
        const entitySummaryList = [...this.state.entitySummaryList]
        const propList = entitySummaryList.filter(entity => entity.subject.uri === answer.link);
        return (
            propList.length > 0 ? propList.map((prop, i) => (
                <div>
                    <Text strong style={{ fontSize: 12 }}>{prop.predicate.label} <a className="focus-style-text" href={prop.object.uri} style={{ marginLeft: '0.5rem' }} target="_blank">{prop.object.label}</a></Text>
                    <br />
                </div>
            )) : <Text strong style={{ fontSize: 12 }}>No Summary</Text>
        )
    };

    renderTextAnswer = () => {
        const answer = this.state.textAnswer;
        return (
            <React.Fragment>
                {answer.length > 0 ? answer.map((text, i) => (
                    <Row style={{ border: '2px solid rgb(24 144 255)', marginTop: "0.3rem" }}>
                        <Col xs={24} xl={19}>
                            <div >
                                <Card hoverable title={<Link className="focus-style-text" href={text.link} bordered target="_blank">
                                    {text.label}</Link>} key={i} bordered={false} style={{ width: '100%' }}>
                                    <Text strong style={{ fontSize: 26, color: 'rgb(24 144 255)' }}>{text.description}</Text>
                                    <Text strong style={{ fontSize: 25 }}>{text.literal}</Text>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} xl={5} >
                            <div style={{ marginLeft: '1rem', textAlign: 'left' }}>
                                <Card hoverable title="Summary" key={i} bordered={false} style={{ width: '100%' }}>
                                    {this.renderSummary(text)}
                                </Card>
                            </div>
                        </Col>

                    </Row>
                )) : null}
            </React.Fragment>
        )
    }


    renderAnswer = () => {
        return (this.state.answered) ? (<Card
            style={{ width: '100%' }}
            title="Answers"
        >
            {this.renderTextAnswer()}
        </Card>) : null
    }

    render() {
        return (
            <div
                style={{
                    backgroundImage: `url(/img/cover.jpg)`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    marginTop: '3rem',
                    height: '35vh'
                }}
            >
                <div style={{
                    height: '35vh',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100vw',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}>
                    <TweenOne >
                        <Row>
                            <Col span={24}>
                                <Title style={{ color: "white", fontFamily: 'Roboto', marginTop: '10rem', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000' }} > Disability Wiki</Title>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    onSelect={this.onSelect}
                                    options={this.state.autocomplete_options}
                                    value={this.state.searchKey}
                                    placeholder=""
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                >
                                    <Input.Search
                                        placeholder="Type the first word to autocomplete"
                                        allowClear
                                        enterButton="Search"
                                        name="Search"
                                        size="large"
                                        aria-label='Search'
                                        suffix={suffix}
                                        ref={this.searchInput}
                                        style={{ marginTop: -4 }}
                                        onChange={this.onChange}
                                        onSearch={this.onSearch}
                                    />
                                </AutoComplete>

                            </Col>
                            <Col span={4}></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}></Col>
                            <Col span={12}>
                                {
                                    (!this.state.answered) ? <Card title="Examples" bordered={false} style={{ width: '100%' }}>
                                        <p ><Text code >What is discrimination</Text>,
                                            <Text keyboard>What is discrimination according to wikidata</Text>,
                                            <Text keyboard>What is disabiilty rights</Text>,
                                            <Text keyboard>Health definition according to CRPD Article 25</Text>,
                                            <Text keyboard>Text from DRPI document</Text>,
                                            <Text keyboard>Text from CRPD Article 12</Text>,
                                            <Text keyboard>Disability wikibase definition about health </Text>,
                                            <Text keyboard>What is prevention of life  </Text>,
                                        </p>
                                    </Card> : null
                                }

                            </Col>
                            <Col span={6}></Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                {
                                    this.renderAnswer()
                                }
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </TweenOne>
                </div>
            </div >
        );
    }
}

export default QASearch;
