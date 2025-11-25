// 中国省市区数据
import type {
  CascaderOption
} from "element-plus";

export interface IRegionOption extends CascaderOption {
  value: string;
  label: string;
  children?: IRegionOption[];
}

export const regionData: IRegionOption[] = [
  {
    value: "110000",
    label: "北京市",
    children: [
      {
        value: "110100",
        label: "北京市",
        children: [
          {
            value: "110101",
            label: "东城区"
          },
          {
            value: "110102",
            label: "西城区"
          },
          {
            value: "110105",
            label: "朝阳区"
          },
          {
            value: "110106",
            label: "丰台区"
          },
          {
            value: "110107",
            label: "石景山区"
          },
          {
            value: "110108",
            label: "海淀区"
          },
          {
            value: "110109",
            label: "门头沟区"
          },
          {
            value: "110111",
            label: "房山区"
          },
          {
            value: "110112",
            label: "通州区"
          },
          {
            value: "110113",
            label: "顺义区"
          },
          {
            value: "110114",
            label: "昌平区"
          },
          {
            value: "110115",
            label: "大兴区"
          },
          {
            value: "110116",
            label: "怀柔区"
          },
          {
            value: "110117",
            label: "平谷区"
          },
          {
            value: "110118",
            label: "密云区"
          },
          {
            value: "110119",
            label: "延庆区"
          }
        ]
      }
    ]
  },
  {
    value: "120000",
    label: "天津市",
    children: [
      {
        value: "120100",
        label: "天津市",
        children: [
          {
            value: "120101",
            label: "和平区"
          },
          {
            value: "120102",
            label: "河东区"
          },
          {
            value: "120103",
            label: "河西区"
          },
          {
            value: "120104",
            label: "南开区"
          },
          {
            value: "120105",
            label: "河北区"
          },
          {
            value: "120106",
            label: "红桥区"
          },
          {
            value: "120110",
            label: "东丽区"
          },
          {
            value: "120111",
            label: "西青区"
          },
          {
            value: "120112",
            label: "津南区"
          },
          {
            value: "120113",
            label: "北辰区"
          },
          {
            value: "120114",
            label: "武清区"
          },
          {
            value: "120115",
            label: "宝坻区"
          },
          {
            value: "120116",
            label: "滨海新区"
          },
          {
            value: "120117",
            label: "宁河区"
          },
          {
            value: "120118",
            label: "静海区"
          },
          {
            value: "120119",
            label: "蓟州区"
          }
        ]
      }
    ]
  },
  {
    value: "130000",
    label: "河北省",
    children: [
      {
        value: "130100",
        label: "石家庄市",
        children: [
          {
            value: "130102",
            label: "长安区"
          },
          {
            value: "130104",
            label: "桥西区"
          },
          {
            value: "130105",
            label: "新华区"
          },
          {
            value: "130107",
            label: "井陉矿区"
          },
          {
            value: "130108",
            label: "裕华区"
          },
          {
            value: "130109",
            label: "藁城区"
          },
          {
            value: "130110",
            label: "鹿泉区"
          },
          {
            value: "130111",
            label: "栾城区"
          },
          {
            value: "130121",
            label: "井陉县"
          },
          {
            value: "130123",
            label: "正定县"
          },
          {
            value: "130125",
            label: "行唐县"
          },
          {
            value: "130126",
            label: "灵寿县"
          },
          {
            value: "130127",
            label: "高邑县"
          },
          {
            value: "130128",
            label: "深泽县"
          },
          {
            value: "130129",
            label: "赞皇县"
          },
          {
            value: "130130",
            label: "无极县"
          },
          {
            value: "130131",
            label: "平山县"
          },
          {
            value: "130132",
            label: "元氏县"
          },
          {
            value: "130133",
            label: "赵县"
          },
          {
            value: "130181",
            label: "辛集市"
          },
          {
            value: "130183",
            label: "晋州市"
          },
          {
            value: "130184",
            label: "新乐市"
          }
        ]
      },
      {
        value: "130200",
        label: "唐山市",
        children: [
          {
            value: "130202",
            label: "路南区"
          },
          {
            value: "130203",
            label: "路北区"
          },
          {
            value: "130204",
            label: "古冶区"
          },
          {
            value: "130205",
            label: "开平区"
          },
          {
            value: "130207",
            label: "丰南区"
          },
          {
            value: "130208",
            label: "丰润区"
          },
          {
            value: "130209",
            label: "曹妃甸区"
          },
          {
            value: "130224",
            label: "滦南县"
          },
          {
            value: "130225",
            label: "乐亭县"
          },
          {
            value: "130227",
            label: "迁西县"
          },
          {
            value: "130229",
            label: "玉田县"
          },
          {
            value: "130281",
            label: "遵化市"
          },
          {
            value: "130283",
            label: "迁安市"
          },
          {
            value: "130284",
            label: "滦州市"
          }
        ]
      },
      {
        value: "130300",
        label: "秦皇岛市",
        children: [
          {
            value: "130302",
            label: "海港区"
          },
          {
            value: "130303",
            label: "山海关区"
          },
          {
            value: "130304",
            label: "北戴河区"
          },
          {
            value: "130306",
            label: "抚宁区"
          },
          {
            value: "130321",
            label: "青龙满族自治县"
          },
          {
            value: "130322",
            label: "昌黎县"
          },
          {
            value: "130324",
            label: "卢龙县"
          }
        ]
      }
    ]
  },
  {
    value: "310000",
    label: "上海市",
    children: [
      {
        value: "310100",
        label: "上海市",
        children: [
          {
            value: "310101",
            label: "黄浦区"
          },
          {
            value: "310104",
            label: "徐汇区"
          },
          {
            value: "310105",
            label: "长宁区"
          },
          {
            value: "310106",
            label: "静安区"
          },
          {
            value: "310107",
            label: "普陀区"
          },
          {
            value: "310109",
            label: "虹口区"
          },
          {
            value: "310110",
            label: "杨浦区"
          },
          {
            value: "310112",
            label: "闵行区"
          },
          {
            value: "310113",
            label: "宝山区"
          },
          {
            value: "310114",
            label: "嘉定区"
          },
          {
            value: "310115",
            label: "浦东新区"
          },
          {
            value: "310116",
            label: "金山区"
          },
          {
            value: "310117",
            label: "松江区"
          },
          {
            value: "310118",
            label: "青浦区"
          },
          {
            value: "310120",
            label: "奉贤区"
          },
          {
            value: "310151",
            label: "崇明区"
          }
        ]
      }
    ]
  },
  {
    value: "320000",
    label: "江苏省",
    children: [
      {
        value: "320100",
        label: "南京市",
        children: [
          {
            value: "320102",
            label: "玄武区"
          },
          {
            value: "320104",
            label: "秦淮区"
          },
          {
            value: "320105",
            label: "建邺区"
          },
          {
            value: "320106",
            label: "鼓楼区"
          },
          {
            value: "320111",
            label: "浦口区"
          },
          {
            value: "320113",
            label: "栖霞区"
          },
          {
            value: "320114",
            label: "雨花台区"
          },
          {
            value: "320115",
            label: "江宁区"
          },
          {
            value: "320116",
            label: "六合区"
          },
          {
            value: "320117",
            label: "溧水区"
          },
          {
            value: "320118",
            label: "高淳区"
          }
        ]
      },
      {
        value: "320200",
        label: "无锡市",
        children: [
          {
            value: "320205",
            label: "锡山区"
          },
          {
            value: "320206",
            label: "惠山区"
          },
          {
            value: "320211",
            label: "滨湖区"
          },
          {
            value: "320213",
            label: "梁溪区"
          },
          {
            value: "320214",
            label: "新吴区"
          },
          {
            value: "320281",
            label: "江阴市"
          },
          {
            value: "320282",
            label: "宜兴市"
          }
        ]
      },
      {
        value: "320300",
        label: "徐州市",
        children: [
          {
            value: "320302",
            label: "鼓楼区"
          },
          {
            value: "320303",
            label: "云龙区"
          },
          {
            value: "320305",
            label: "贾汪区"
          },
          {
            value: "320311",
            label: "泉山区"
          },
          {
            value: "320312",
            label: "铜山区"
          },
          {
            value: "320321",
            label: "丰县"
          },
          {
            value: "320322",
            label: "沛县"
          },
          {
            value: "320324",
            label: "睢宁县"
          },
          {
            value: "320381",
            label: "新沂市"
          },
          {
            value: "320382",
            label: "邳州市"
          }
        ]
      }
    ]
  },
  {
    value: "330000",
    label: "浙江省",
    children: [
      {
        value: "330100",
        label: "杭州市",
        children: [
          {
            value: "330102",
            label: "上城区"
          },
          {
            value: "330105",
            label: "拱墅区"
          },
          {
            value: "330106",
            label: "西湖区"
          },
          {
            value: "330108",
            label: "滨江区"
          },
          {
            value: "330109",
            label: "萧山区"
          },
          {
            value: "330110",
            label: "余杭区"
          },
          {
            value: "330111",
            label: "富阳区"
          },
          {
            value: "330112",
            label: "临安区"
          },
          {
            value: "330113",
            label: "临平区"
          },
          {
            value: "330114",
            label: "钱塘区"
          },
          {
            value: "330122",
            label: "桐庐县"
          },
          {
            value: "330127",
            label: "淳安县"
          },
          {
            value: "330182",
            label: "建德市"
          }
        ]
      },
      {
        value: "330200",
        label: "宁波市",
        children: [
          {
            value: "330203",
            label: "海曙区"
          },
          {
            value: "330205",
            label: "江北区"
          },
          {
            value: "330206",
            label: "北仑区"
          },
          {
            value: "330211",
            label: "镇海区"
          },
          {
            value: "330212",
            label: "鄞州区"
          },
          {
            value: "330213",
            label: "奉化区"
          },
          {
            value: "330225",
            label: "象山县"
          },
          {
            value: "330226",
            label: "宁海县"
          },
          {
            value: "330281",
            label: "余姚市"
          },
          {
            value: "330282",
            label: "慈溪市"
          }
        ]
      }
    ]
  },
  {
    value: "440000",
    label: "广东省",
    children: [
      {
        value: "440100",
        label: "广州市",
        children: [
          {
            value: "440103",
            label: "荔湾区"
          },
          {
            value: "440104",
            label: "越秀区"
          },
          {
            value: "440105",
            label: "海珠区"
          },
          {
            value: "440106",
            label: "天河区"
          },
          {
            value: "440111",
            label: "白云区"
          },
          {
            value: "440112",
            label: "黄埔区"
          },
          {
            value: "440113",
            label: "番禺区"
          },
          {
            value: "440114",
            label: "花都区"
          },
          {
            value: "440115",
            label: "南沙区"
          },
          {
            value: "440117",
            label: "从化区"
          },
          {
            value: "440118",
            label: "增城区"
          }
        ]
      },
      {
        value: "440300",
        label: "深圳市",
        children: [
          {
            value: "440303",
            label: "罗湖区"
          },
          {
            value: "440304",
            label: "福田区"
          },
          {
            value: "440305",
            label: "南山区"
          },
          {
            value: "440306",
            label: "宝安区"
          },
          {
            value: "440307",
            label: "龙岗区"
          },
          {
            value: "440308",
            label: "盐田区"
          },
          {
            value: "440309",
            label: "龙华区"
          },
          {
            value: "440310",
            label: "坪山区"
          },
          {
            value: "440311",
            label: "光明区"
          }
        ]
      },
      {
        value: "440400",
        label: "珠海市",
        children: [
          {
            value: "440402",
            label: "香洲区"
          },
          {
            value: "440403",
            label: "斗门区"
          },
          {
            value: "440404",
            label: "金湾区"
          }
        ]
      }
    ]
  }
];
