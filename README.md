# https://sfdb-team.github.io/gf-story-timeline/gf_timeline

### [소녀전선 스토리 타임라인 - Girls' Frontline Story Timeline](https://sfdb-team.github.io/gf-story-timeline/gf_timeline/)

#### Note

- 이 타임라인은 개인의 관심과 웹 개발 연습을 위해 만들어졌으며, 이번에 보았던 「시코바코 타임라인」에서 영감을 얻어, 「[소녀전선](https://www.girlsfrontline.co.kr)」의 스토리의 매력을 더 많은 친구에게 소개하고자 합니다.

- 텍스트는 게임의 스토리 전개와 전체적인 배경 설정과 일부 설정 설명을 곁들이고, 온라인상에서 공개된 설정과 플롯을 참고했습니다.

- 게임 소재를 사용하였으므로 저작권은 소녀전선의 제작진이 소유하며, 개인 능력의 한계가 있으므로, 누락 및 오류가 있는 경우에는 정정해 주시고, 최종 줄거리는 게임을 통해 확인해주세요.

#### Reference

- [萌娘百科 - 少女前线:世界观](https://zh.moegirl.org/少女前线:世界观)
- [NGA 少女前线-16LAB研究院 少女前线主线剧情文本阅读](https://bbs.ngacn.cc/read.php?tid=12213204)
- [德拉贡诺夫废人养成 bilibili 专栏](https://space.bilibili.com/218683#/article)
- [台历上的少前大事件时间线](https://tieba.baidu.com/p/4926626022)
- [少女前线背景设定时间线总结整理【更新改进版】](https://tieba.baidu.com/p/4685237079)
- [2018年冬日活动“坍缩点”](https://weibo.com/ttarticle/p/show?id=2309404213543208629472)
- [少女前线2018冬活“塌缩点”全剧情对话整理](https://weibo.com/ttarticle/p/show?id=2309404205309404030707)

#### Description

- 항목은 데이터 분리 형식을 채택하여, 텍스트 리소스는 [data](https://github.com/SFDB-Team/gf-story-timeline/blob/master/gf_timeline/data/) 폴더 안에, 이미지 리소스는 [image](https://github.com/SFDB-Team/gf-story-timeline/blob/master/gf_timeline/image) 폴더 안에 각각 다른 언어로 저장됩니다.
- 데이터 구조 가이드

	- [info.json](https://github.com/SFDB-Team/gf-story-timeline/blob/master/gf_timeline/data/KR/info.json) 항목을 설명합니다.
	
	- [catalog.json](https://github.com/SFDB-Team/gf-story-timeline/blob/master/gf_timeline/data/KR/catalog.json) List의 항목을 타임라인에 대응시킵니다.
	
	```
	{
		"title": "카탈로그",
		"close": "돌아가기",
		"index": [
			{
				"title": "내용에 앞서",
				"index": 0 // data.json의 데이터에 대응시킵니다.
			},
		]
	}
	```
	
	- [header.json](https://github.com/SFDB-Team/gf-story-timeline/blob/master/gf_timeline/data/KR/header.json) 타임라인 상단탭에 대응합니다.
	
	```
	[
		{
			"title": "내용에 앞서",
			"position_x": 0 // data.json의 X 좌표 데이터에 대응합니다.
		},
	]
	```

	- [data.json](https://github.com/SFDB-Team/gf-story-timeline/blob/master/gf_timeline/data/KR/data.json) 타임라인 데이터
	
	```
	[
		{
			"title": "설명",
			"subtitle": "소녀전선 스토리 타임라인",
			"content": "내용, 줄바꿈<br>등, 단어 수 제한에 주의하여 모바일 브라우저에 최대한 적합하도록",
			"image": "common_title.png", // image 폴더안에 존재하는 이미지
			"position_y": 0, //시간축 세로 위치，0-2
			"position_x": 0, //시간축 가로 위치, 수동으로 계산해야함.
			"position_width": 200 // 시간축 가로의 길이，기본값 300，특별히 수정하지 않는걸 권함.
		},
		// 여기의 빈 행에 주의하여 편리하게 사용할 수 있습니다. catalog.json 해당 위치를 신속하게 찾을 수도 있습니다..
		{
			...
		},
	]
	```

- 이미지 가이드
	
	- 이미지 모두 알파벳 소문자를 이름으로 사용합니다. 포맷은 `.png`, 크기가 `600 x 336` 인 직사각형이며 약간 줄일 수 있지만 이 크기를 초과 할 수 없습니다.
	- 이미지를 사용할때는 `Web format + PNG-8 128 디더링`을 사용해야합니다.
	- `common_` 일반 이미지에 사용합니다.
	- `intro_` 배경에 대한 그림에 사용합니다.
	- `x-y_` 일반전역에 사용합니다.
	- `x-e-y_` 긴급전역에 사용합니다.
	- `spx-y-z` 이벤트전역에 사용합니다. 'x'는 x 번째 이벤트이며 'y-z'는 맵 코드입니다.

#### 당신의 참여를 기대합니다

	- 중요한 정보를 놓치지 않고, 스토리의 연관성과 재미를 보장해주는 비교적 귀찮고 번거로운 작업입니다. 혹여 지휘관께서 관심이 있으시면 저희와 함께해주십시오.

	- PR을 하는 것이 불편하다면, 엑셀 또는 TXT등 어떤 형태로든 기존의 형식으로 스토리를 요약해 주시면 됩니다.

	- 이곳에 찾아 주셔서 다시 한 번 감사드립니다!
---

### [문서편집기](https://icaics.github.io/richtext/)

Based on [webfashionist / RichText](https://github.com/webfashionist/RichText)
