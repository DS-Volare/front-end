import * as d3 from 'd3';
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { useEffect, useRef } from 'react';

// mindap data type
interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: string;
  level: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

type Data = {
  nodes: Node[];
  links: Link[];
};

// response data type
type MindmapProps = {
  result: ResponseStatisticsType;
};

type ResponseStatisticsType = {
  title: string;
  locations: string[];
  characters: string[];
};

// Props 타입 정의
interface ForceGraphProps {
  nodes: Node[];
  links: Link[];
  nodeId: (d: Node) => string;
  nodeGroup: (d: Node) => string;
  nodeGroups?: string[];
  nodeTitle: (d: Node) => string;
  nodeFill?: string;
  nodeStroke?: string;
  nodeStrokeWidth?: number;
  nodeStrokeOpacity?: number;
  nodeRadius?: number;
  nodeStrength?: number | ((d: Node) => number);
  linkSource?: (d: Link) => string;
  linkTarget?: (d: Link) => string;
  linkStroke?: string;
  linkStrokeOpacity?: number;
  linkStrokeWidth?: number | ((d: Link) => number);
  linkStrokeLinecap?: string;
  linkStrength?: number | ((d: Link) => number);
  colors?: string[];
  width?: number;
  height?: number;
  invalidation?: Promise<void>;
}

const colorArr: string[] = [
  'rgb(255, 179, 186)',
  'rgb(255, 200, 137)',
  'rgb(130, 215, 255)',
  'rgb(255, 223, 186)',
  'rgb(193, 235, 255)',
];

// ForceGraph 함수
const ForceGraph = (
  data: { nodes: Node[]; links: Link[] },
  {
    nodeId = (d: Node) => d.id,
    nodeGroup,
    nodeGroups,
    nodeTitle,
    nodeFill = 'currentColor',
    nodeStroke = '#fff',
    nodeStrokeWidth = 1.5,
    nodeStrokeOpacity = 1,
    //nodeRadius = 50
    nodeStrength = -100,
    linkSource = ({ source }) => source,
    linkTarget = ({ target }) => target,
    linkStroke = '#999',
    linkStrokeOpacity = 0.6,
    linkStrokeWidth = 4,
    linkStrokeLinecap = 'round',
    linkStrength = 0.1,
    colors = colorArr,
    width = 640,
    height = 400,
    invalidation,
  }: Partial<ForceGraphProps> = {}
) => {
  const { nodes, links } = data;
  const N = d3.map(nodes, nodeId).map(intern);
  const LS = d3.map(links, linkSource).map(intern);
  const LT = d3.map(links, linkTarget).map(intern);
  if (nodeTitle === undefined) nodeTitle = (d: Node) => d.id;
  const T = d3.map(nodes, nodeTitle);
  const G = nodeGroup
    ? d3.map(nodes, (d: Node) => nodeGroup(d)).map(intern)
    : null;
  const W =
    typeof linkStrokeWidth !== 'function'
      ? null
      : d3.map(links, linkStrokeWidth);
  const L = typeof linkStroke !== 'function' ? null : d3.map(links, linkStroke);

  const mutableNodes = nodes.map((node) => ({
    ...node,
  })) as d3.SimulationNodeDatum[];
  const mutableLinks = links.map((link) => ({
    source: LS.find((id) => id === link.source),
    target: LT.find((id) => id === link.target),
    value: link.value,
  })) as d3.SimulationLinkDatum<Node>[];

  if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

  //const color = d3.scaleOrdinal(nodeGroups || [], colors);
  const groupLevelKey = (d: Node) => `${d.group}-${d.level}`;

  const color = d3.scaleOrdinal(data.nodes.map(groupLevelKey), colorArr);

  const forceNode = d3
    .forceManyBody()
    .strength(
      typeof nodeStrength === 'number'
        ? nodeStrength
        : (
            d: d3.SimulationNodeDatum,
            i: number,
            data: d3.SimulationNodeDatum[]
          ) => nodeStrength(d as Node)
    );
  const forceLink = d3
    .forceLink(mutableLinks)
    .distance(
      (link: d3.SimulationLinkDatum<Node>) => 200 - (link as Link).value * 50
    )
    .id((d: SimulationNodeDatum, i) => {
      const node = d as Node;
      if (i !== undefined && N[i] !== undefined) {
        return N[i];
      }
      return node.id;
    })
    .strength(
      typeof linkStrength === 'number'
        ? linkStrength
        : (link, i, links) => linkStrength(link as Link)
    );

  // 드래그 이벤트 핸들러
  const dragstarted = (
    event: d3.D3DragEvent<SVGCircleElement, Node, Node>
  ): void => {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  };

  const dragged = (
    event: d3.D3DragEvent<SVGCircleElement, Node, Node>
  ): void => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  };

  const dragended = (
    event: d3.D3DragEvent<SVGCircleElement, Node, Node>
  ): void => {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  };

  // func: 노드의 크기를 그룹에 따라 다르게 설정
  const nodeRadius = (node: Node): number => {
    switch (node.level) {
      case 1:
        return 80;
      case 2:
        return 60;
      case 3:
        return 40;
      default:
        return 40;
    }
  };

  const simulation = d3
    .forceSimulation(mutableNodes)
    .force('link', forceLink)
    .force('charge', forceNode)
    .force('center', d3.forceCenter())
    .force('collide', d3.forceCollide(70))
    .on('tick', ticked);

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  const link = svg
    .append('g')
    .attr('stroke', typeof linkStroke !== 'function' ? linkStroke : null)
    .attr('stroke-opacity', linkStrokeOpacity)
    .attr(
      'stroke-width',
      typeof linkStrokeWidth !== 'function' ? linkStrokeWidth : null
    )
    .attr('stroke-linecap', linkStrokeLinecap)
    .selectAll('line')
    .data(mutableLinks)
    .join('line');

  const node = svg
    .append('g')
    .attr('fill', nodeFill)
    .attr('stroke', nodeStroke)
    .attr('stroke-opacity', nodeStrokeOpacity)
    .attr('stroke-width', nodeStrokeWidth)
    .selectAll('g')
    .data(mutableNodes)
    .join('g')
    .call(
      d3
        .drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
    );

  node
    .append('circle')
    .attr('r', (d: d3.SimulationNodeDatum) => {
      const node = d as Node;
      return nodeRadius(node);
    })
    .attr('fill', (d: d3.SimulationNodeDatum) => {
      const node = d as Node;
      return color(groupLevelKey(node));
    });

  node
    .append('text')
    .text((d: d3.SimulationNodeDatum, i: number) => {
      return T ? T[i] : '';
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .attr('fill', '#000000')
    .attr('stroke', 'none')
    .attr('font-size', '1.5em');

  if (W) {
    link.attr('stroke-width', (d: d3.SimulationLinkDatum<Node>, i: number) => {
      return W[i] ?? linkStrokeWidth;
    });
  }
  if (L) {
    link.attr('stroke', (d: d3.SimulationLinkDatum<Node>, i: number) => {
      return (L && L[i] !== undefined ? L[i] : linkStroke) as string;
    });
  }
  if (G) {
    node.attr('fill', function (d: d3.SimulationNodeDatum, i: number) {
      const nodeData = d as Node;
      return G[i] !== undefined ? color(G[i]) : nodeFill;
    });
  }

  if (T) {
    node.append('title').text(function (d: d3.SimulationNodeDatum, i: number) {
      const nodeData = d as Node;
      return T[i] !== undefined ? T[i] : '';
    });
  }

  if (invalidation != null) invalidation.then(() => simulation.stop());

  function intern(value: any) {
    return value !== null && typeof value === 'object'
      ? value.valueOf()
      : value;
  }

  function ticked() {
    link
      .attr('x1', (d: d3.SimulationLinkDatum<Node>) => {
        const sourceNode = d.source as Node;
        return sourceNode.x ?? 0;
      })
      .attr('y1', (d: d3.SimulationLinkDatum<Node>) => {
        const sourceNode = d.source as Node;
        return sourceNode.y ?? 0;
      })
      .attr('x2', (d: d3.SimulationLinkDatum<Node>) => {
        const targetNode = d.target as Node;
        return targetNode.x ?? 0;
      })
      .attr('y2', (d: d3.SimulationLinkDatum<Node>) => {
        const targetNode = d.target as Node;
        return targetNode.y ?? 0;
      });

    node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
  }

  const svgNode = svg.node();
  if (svgNode) {
    return Object.assign(svgNode, { scales: { color } });
  } else {
    throw new Error('SVG node is null');
  }
};

const Mindmap = ({ result }: MindmapProps) => {
  const width = 928;
  const height = 700;
  const svgRef = useRef<HTMLDivElement | null>(null);

  const RefineData = (result: ResponseStatisticsType) => {
    const data: Data = {
      nodes: [],
      links: [],
    };

    // base push
    data.nodes.push(
      { id: '<' + result.title + '>', group: '1', level: 1 },
      { id: '장소', group: '2', level: 2 },
      { id: '등장인물', group: '3', level: 2 }
    );

    data.links.push(
      { source: '<' + result.title + '>', target: '장소', value: 1 },
      { source: '<' + result.title + '>', target: '등장인물', value: 1 }
    );

    // data push
    result.locations.map((item, _) => {
      data.nodes.push({ id: item, group: '2', level: 3 });
      data.links.push({ source: '장소', target: item, value: 3 });
    });

    result.characters.map((item, _) => {
      data.nodes.push({ id: item, group: '3', level: 3 });
      data.links.push({ source: '등장인물', target: item, value: 3 });
    });

    return data;
  };

  useEffect(() => {
    // data refine
    const data = RefineData(result);

    // create mindmap
    if (svgRef.current) {
      // ForceGraph 함수 호출하여 SVG 생성
      const svgNode = ForceGraph(data, { width, height });
      if (svgNode) {
        svgRef.current.innerHTML = ''; // 기존 내용 삭제
        svgRef.current.appendChild(svgNode); // 새 SVG 추가
      }
    }
  }, [width]);

  return <div ref={svgRef}></div>;
};

export default Mindmap;
