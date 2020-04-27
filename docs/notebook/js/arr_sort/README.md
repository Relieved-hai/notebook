::: tip
选择合适的排序
:::

![数组排序](./arr_sort.png)

## 冒泡排序
> 冒泡排序通常是我们在学习编程的过程中遇到排序问题，最先接触到的算法，它的算法过程就是每一趟排序都会通过交换不满足排序状态的相邻两个数来达到每一趟排序都让一个元素“冒泡”到正确位置，直到最后一趟“冒泡”过程完成，也就完成了排序。

```js
function bubbleSort(arr) {
  if (arr.length <= 1) return arr

  let i, j, m, stop // stop 标识符，表示没有发生任何的元素交换
  let len = arr.length

  for (i = 0; i < len - 1; i++) {
    stop = true
    for (j = 0; j < len - i - 1; j++) {
      
      // es5 替换元素
      if (arr[j] > arr[j + 1]) {
        m = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = m
        stop = false
      }
    }

    if (stop) break
  }

  return arr
}
```

<br/>

## 选择排序
> 选择排序是一种简单直观的排序算法，无论什么数据进去都是O(n2) 的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。

```js
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```

## 插入排序
> 插入排序的思路跟整理扑克牌是一样的，即每次拿到一张牌，按大小顺序将其插入到合适的位置。那么插入排序实际上就是：每次将一个数插入到有序的数组中去(初始一个数字自然有序)。

```js
function insertion(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        arr.splice(j, 0, arr[i])
        arr.splice(i + 1, 1)
        break
      }
    }
  }
  return arr
}
```

## 希尔排序
> 希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。
  希尔排序是基于插入排序的以下两点性质而提出改进方法的：
  - 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；
  - 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；
> 希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。

```js
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap = gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}
```

## 归并排序
> 归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个典型的应用。 合并排序法是将两个（或两个以上）有序表合并成一个新的有序表，即把待排序序列分为若干个子序列，每个子序列是有序的。然后再把有序子序列合并为整体有序序列。 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

```js
function merge(leftArr, rightArr) {  
    var result = [];  
    while (leftArr.length > 0 && rightArr.length > 0){  
      if (leftArr[0] < rightArr[0])  
        result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
      else   
        result.push(rightArr.shift());  
    }   
    return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
}  

function mergeSort(array) {  
    if (array.length == 1) return array;  
    var middle = Math.floor(array.length / 2);       //求出中点  
    var left = array.slice(0, middle);               //分割数组  
    var right = array.slice(middle);  
    return merge(mergeSort(left), mergeSort(right)); //递归合并与排序  
}  
```

## 快速排序
> 快速排序由于排序效率在同为O(N*logN)的几种排序方法中效率较高，因此经常被采用，再加上快速排序思想----分治法也确实实用。快速排序是一种既不浪费空间又可以快一点的排序算法。

```js
var quickSort = function(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
    var pivot = arr.splice(pivotIndex, 1)[0];  //基准数
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
};
```

## 堆排序
- （1）由数组构造一个堆结构，该结构满足父节点总是大于（或小于）其子节点。
- （2）从堆结构的最右边的叶子节点开始，从右至左、从下至上依次与根节点进行交换，每次交换后，都要再次构建堆结构。值得注意的是每次构建堆结构时，都要忽略已经交换过的非根节点。
```js
function heapSort(arr) {
     //console.time('HeapSort');
     buildHeap(arr);
     for(let i=arr.length-1; i>0; i--) {
         // 从最右侧的叶子节点开始，依次与根节点的值交换。
         [arr[i], arr[0]] = [arr[0], arr[i]];
         // 每次交换之后都要重新构建堆结构，记得传入i限制范围，防止已经交换的值仍然被重新构建。
         heapify(arr, i, 0);
     }
     //console.timeEnd('HeapSort');
     return arr;
     function buildHeap(arr) {
         // 可以观察到中间下标对应最右边叶子节点的父节点。
         let mid = Math.floor(arr.length / 2);
         for(let i=mid; i>=0; i--) {
             // 将整个数组构建成堆结构以便初始化。
             heapify(arr, arr.length, i);
         }
         return arr;
     }
     // 从i节点开始下标在heapSize内进行堆结构构建的函数。
     function heapify(arr, heapSize, i) {
         // 左子节点下标。
         let left = 2 * i + 1,
             // 右子节点下标。
             right = 2 * i + 2,
             // 假设当前父节点满足要求（比子节点都大）。
             largest = i;
         // 如果左子节点在heapSize内，并且值大于其父节点，那么left赋给largest。
         if(left < heapSize && arr[left] > arr[largest]) {
             largest = left;
         }
         // 如果右子节点在heapSize内，并且值大于其父节点，那么right赋给largest。
         if(right < heapSize && arr[right] > arr[largest]) {
             largest = right;
         }
         if(largest !== i) {
             // 如果largest被修改了，那么交换两者的值使得构造成一个合格的堆结构。
             [arr[largest], arr[i]] = [arr[i], arr[largest]];
             // 递归调用自身，将节点i所有的子节点都构建成堆结构。
             arguments.callee(arr, heapSize, largest);
         }
         return arr;
     }
 }

```
