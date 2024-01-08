set ENV_PATH=%CD%\..\..\..\environment\%USERNAME%-s4.env
title client dashboard angular
ng build --watch --base-href /client-dashboard/ --build-optimizer true --optimization true

