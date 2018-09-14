//  3.写一个有效的算法完成矩阵搜索，这个矩阵有如下特点：

    //  1) 矩阵中的每行数字都是经过排序的，从左到右依次变大。
   
    //  2) 每行的第一个数字都比上一行的最后一个数字大
   
           // 矩阵搜索题
           /**
               例如：
               [
                   [2,   4,  8,  9],
                   [10, 13, 15, 21],
                   [23, 31, 33, 51]
               ]
               实现一个函数，搜索这个数组
               输入：4，返回：true
               输入：3，返回：false
               你等下发邮件，我好管理。
           */
   
          const arr =  [
            [2,   4,  8,  9],
            [10, 13, 15, 21],
            [23, 31, 33, 51]
        ];
    // let num = 4;
    

    // 一维数组二分法查找
    function searchArray(arr, num){
        console.log('arr...', arr, num);
        let len = arr.length;
        if (arr[0] > num || arr[len-1] < num){
            return false;
        }else {
            let mid = Math.floor(arr.length/2);
            console.log(mid)
            if (arr[mid] > num){
                return searchArray(arr.slice(0, mid-1), num);
            }else if(arr[mid] < num){
                return searchArray(arr.slice(mid+1, len), num);
            }else{
                return true;
            }
        }
    }

    // 二维数组二分查找
    function search(arr, num){
        console.log(arr);
        let len = arr.length,
            arrLen = arr[0].length;
        let middle = Math.floor(arr.length/2);
        if (arr[middle][0] > num ){
            // 当最小值小于num，在前面查找
            return search(arr.slice(0, middle), num);
        }else if(arr[middle][arrLen-1] < num){
            // 当最大值大于num，在后面查找
            return search(arr.slice(middle, len-1), num);
        }else{
            // 在这中间，调用一维数组查找方法
            return searchArray(arr[middle], num);
        } 
    }
    let result = search(arr, 10);
    console.log('查询结果...', result);