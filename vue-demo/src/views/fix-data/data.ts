export const MOCK_DATA01 = {
  cells: [
    {
      position: {
        x: -110,
        y: 341,
      },
      size: {
        width: 36,
        height: 36,
      },
      attrs: {
        text: {
          fontSize: 12,
          fill: "#000",
          fontWeight: "bold",
          text: "开始",
        },
        body: {
          stroke: "#fff",
          strokeWidth: 2,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
      visible: true,
      shape: "circle",
      id: "node_start",
      zIndex: 1,
      data: {},
      ports: {
        groups: {
          group1: {
            position: {
              name: "right",
            },
          },
        },
        items: [
          {
            id: "port1",
            group: "group1",
            args: {
              strict: true,
            },
            position: {
              name: "left",
            },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: "transparent",
                strokeWidth: 2,
                fill: "transparent",
              },
            },
          },
        ],
      },
    },
    {
      position: {
        x: 30,
        y: 345,
      },
      size: {
        width: 80,
        height: 28,
      },
      attrs: {
        text: {
          fontSize: 12,
          fill: "#1A1A1A",
          fontWeight: "bold",
          text: "未开始",
        },
        body: {
          stroke: "#6C6C6C",
          strokeWidth: 2,
          fill: "#6C6C6C",
          rx: 4,
          ry: 4,
        },
      },
      visible: true,
      shape: "rect",
      id: "c2f3a4b8-8760-4862-9180-755ad036fce4",
      zIndex: 1,
    },
    {
      position: {
        x: 240,
        y: 650,
      },
      size: {
        width: 80,
        height: 28,
      },
      attrs: {
        text: {
          fontSize: 12,
          fill: "#222222",
          fontWeight: "bold",
          text: "已暂停",
        },
        body: {
          stroke: "#F0C420",
          strokeWidth: 2,
          fill: "#F0C420",
          rx: 4,
          ry: 4,
        },
      },
      visible: true,
      shape: "rect",
      id: "7cf222d6-71cd-4de9-a007-643e16e7c82c",
      zIndex: 1,
      data: null,
      v3: {},
    },
    {
      position: {
        x: 360,
        y: 240,
      },
      size: {
        width: 80,
        height: 28,
      },
      attrs: {
        text: {
          fontSize: 12,
          fill: "#FFFFFF",
          fontWeight: "bold",
          text: "进行中",
        },
        body: {
          stroke: "#2675D9",
          strokeWidth: 2,
          fill: "#2675D9",
          rx: 4,
          ry: 4,
        },
      },
      visible: true,
      shape: "rect",
      id: "7f713bcd-c450-40d7-a507-ef6932fe1379",
      zIndex: 1,
    },
    {
      position: {
        x: 830,
        y: 240,
      },
      size: {
        width: 80,
        height: 28,
      },
      attrs: {
        text: {
          fontSize: 12,
          fill: "#FFFFFF",
          fontWeight: "bold",
          text: "已完成",
        },
        body: {
          stroke: "#ffffff",
          strokeWidth: 2,
          fill: "#25C09C",
          rx: 4,
          ry: 4,
        },
      },
      visible: true,
      shape: "rect",
      id: "daf3978e-d675-41fa-8649-dab59381b6ec",
      zIndex: 1,
      data: null,
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "07692403-9ea4-4dd8-bdba-c602b8fa643f",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "恢复制作",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 0,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {},
      zIndex: 1,
      source: {
        cell: "7cf222d6-71cd-4de9-a007-643e16e7c82c",
        port: "port2",
      },
      target: {
        cell: "7f713bcd-c450-40d7-a507-ef6932fe1379",
        port: "port2",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "923e70e9-f628-48c2-8171-94b03d0b2eb5",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "暂停",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 0,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {},
      zIndex: 1,
      source: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
        port: "port4",
      },
      target: {
        cell: "7cf222d6-71cd-4de9-a007-643e16e7c82c",
        port: "port7",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "02d0a86e-2e2e-4a1c-8534-61fbd351b41c",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
            {
              tagName: "image",
              selector: "image",
            },
          ],
          attrs: {
            label: {
              text: "启动",
              fill: "#C4C4C4",
              fontSize: 12,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
            body: {
              ref: "label",
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: 40,
              refHeight: "160%",
              refX: -30,
              refY: "-30%",
            },
            image: {
              ref: "label",
              href: "https://localhost:8080/static/icons/work-rule-icon.png",
              width: 16,
              height: 16,
              refX: -20,
              refY: 0,
              opacity: 1,
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {
        label: "启动",
        description: "",
        rule: {
          post_actions: [
            {
              key: "auto_create_task",
              value: [
                {
                  object_type: "Entity",
                  properties: {
                    name: "测试1111",
                  },
                },
                {
                  object_type: "Entity",
                  properties: {
                    name: "请输入子任务名称",
                  },
                },
                {
                  object_type: "Entity",
                  properties: {
                    name: "请输入子任务名称2",
                  },
                },
                {
                  object_type: "Entity",
                  properties: {
                    name: "请输入子任务名称3",
                  },
                },
              ],
            },
          ],
        },
      },
      zIndex: 1,
      source: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
        port: "port7",
      },
      target: {
        cell: "7f713bcd-c450-40d7-a507-ef6932fe1379",
        port: "port1",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "b729d193-8eb1-4f5f-a218-54a749c90724",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
            {
              tagName: "image",
              selector: "image",
            },
          ],
          attrs: {
            label: {
              text: "qqwe",
              fill: "#C4C4C4",
              fontSize: 12,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
            body: {
              ref: "label",
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "160%",
              refHeight: "160%",
              refX: "-35%",
              refY: "-30%",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {
        label: "qqwe",
        description: "",
        rule: {},
      },
      zIndex: 1,
      source: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
      },
      target: {
        cell: "7f713bcd-c450-40d7-a507-ef6932fe1379",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "c1ed45d0-fd34-49cf-82b6-3f95260c6e5f",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 12,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      zIndex: 1,
      source: {
        cell: "node_start",
      },
      target: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "46036854-9b97-4b71-986d-32b8540f2e1f",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "恢复开始",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 0,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {},
      zIndex: 1,
      source: {
        cell: "7cf222d6-71cd-4de9-a007-643e16e7c82c",
      },
      target: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
        port: "port2",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "9c2fe463-b6b4-4c42-857f-a7b7cd3e8771",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "重新开始",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 0,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {},
      zIndex: 1,
      source: {
        cell: "7f713bcd-c450-40d7-a507-ef6932fe1379",
        port: "port8",
      },
      target: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
        port: "port6",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "2466562c-b751-44e4-bb7c-49722d322da6",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "暂停",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 0,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {},
      zIndex: 1,
      source: {
        cell: "7f713bcd-c450-40d7-a507-ef6932fe1379",
        port: "port3",
      },
      target: {
        cell: "7cf222d6-71cd-4de9-a007-643e16e7c82c",
        port: "port8",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "d3da63e2-9be7-431d-a0ee-77e63c3053a9",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          attrs: {
            label: {
              text: "驳回交付",
              fontSize: 12,
            },
            body: {
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: "120%",
              refHeight: "160%",
              refX: "-10%",
              refY: "-30%",
            },
            text: {
              fill: "#C4C4C4",
              fontSize: 0,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {},
      zIndex: 1,
      source: {
        cell: "daf3978e-d675-41fa-8649-dab59381b6ec",
      },
      target: {
        cell: "7f713bcd-c450-40d7-a507-ef6932fe1379",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "c5cfacff-fd6b-49a0-bfb3-0e8808dd4700",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
            {
              tagName: "image",
              selector: "image",
            },
          ],
          attrs: {
            label: {
              text: "快捷完成",
              fill: "#C4C4C4",
              fontSize: 12,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
            body: {
              ref: "label",
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: 40,
              refHeight: "160%",
              refX: -30,
              refY: "-30%",
            },
            image: {
              ref: "label",
              href: "//arthub-test.qq.com/asset-matrix-static/static/icons/work-rule-icon.png",
              width: 16,
              height: 16,
              refX: -20,
              refY: 0,
              opacity: 1,
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
      data: {
        label: "快捷完成",
        description: "",
        rule: {
          post_actions: [
            {
              key: "auto_create_task",
              value: [
                {
                  object_type: "Entity",
                  properties: {
                    name: "请输入子任务名称",
                    workflow_id: 99120641302404,
                  },
                },
              ],
            },
          ],
        },
      },
      zIndex: 1,
      source: {
        cell: "c2f3a4b8-8760-4862-9180-755ad036fce4",
        port: "port5",
      },
      target: {
        cell: "daf3978e-d675-41fa-8649-dab59381b6ec",
        port: "port5",
      },
    },
    {
      shape: "edge",
      attrs: {
        line: {
          stroke: "#979797",
        },
      },
      id: "f76af748-4807-4ab6-8584-1ae76d079a0c",
      router: "manhattan",
      connector: {
        name: "rounded",
      },
      labels: [
        {
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
            {
              tagName: "image",
              selector: "image",
            },
          ],
          attrs: {
            label: {
              text: "完成",
              fill: "#C4C4C4",
              fontSize: 12,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
            },
            body: {
              ref: "label",
              fill: "#191919",
              stroke: "#979797",
              opacity: 1,
              strokeWidth: 2,
              rx: 16,
              ry: 16,
              refWidth: 40,
              refHeight: "160%",
              refX: -30,
              refY: "-30%",
            },
            image: {
              ref: "label",
              href: "/amwb/static/icons/work-rule-icon.png",
              width: 16,
              height: 16,
              refX: -20,
              refY: 0,
              opacity: 1,
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ],
    },
  ],
};
