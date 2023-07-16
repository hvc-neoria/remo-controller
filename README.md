## スプレッドシート

![image](https://github.com/hvc-neoria/remo-controller/assets/20467560/3880d532-393b-4926-bf32-8aaf2bdfd69a)

## クラス図

```mermaid
classDiagram

def ..> PropertiesService
usecase ..> PropertiesService
usecase ..> remoCommander
usecase ..> sheetWriter
remoCommander ..> PropertiesService
remoCommander ..> def
sheetWriter ..> PropertiesService

PropertiesService : String airconId
PropertiesService : String accessToken
PropertiesService : String spreadSheetId
```
