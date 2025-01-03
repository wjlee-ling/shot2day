# Flex & Grid

레이아웃을 잡고자 항상 쓰게 되는 컨테이너 문법인 Flex와 Grid. 그동안 감으로만 쓰던 tailwindcss 속성들을 정리했다.

## `flex`

하나의 '컨테이너' 또는 '박스'를 설정하기 위해 일단 `flex`를 설정해야 한다.

## `flex-1`

- `flex 1 1 0%` 의 alias
- `flex` 박스/컨테이너 안에 들어가는 요소들(flex item)을 늘리고 줄이는 설정을 지정하는 방법으로 `1 1 0%`은 각각 (순서대로)
    - `flex-grow`: `1` (item can *grow to fill any available space*) <-> `0` (item cannot grow)
    - `flex-shrink`: `1` (tiem can *shrink if needed*) <-> `0` (item cannot shrink)
    - `flex-basis`: `0%` item의 초기 크기값. 절대값으로 rem, 퍼센트 또는 분수꼴로 사용될 수 있다. 
- cf. `flex` v.s. `flex-1`: `flex`는 박스, `flex-1`은 그 박스에 들어가는 요소들의 설정이므로 부모 또는 동일 tag에서 `flex`를 지정해야 `flex-1` 사용 가능

## `flex-row` & `flex-col`

- 요소들이 놓이는 방향
- `-reverse`라는 suffix를 사용하면 놓이는 순서를 정반대로 지정 가능