---
category: Leetcode
tags:
  - Golang Leetcode
date: 2020-04-12
title: Leetcode刷题--Go语法练习
lang: zh-CN

---

03、重复数字
04、二维数组中的查找
06、从尾到头打印链表
07、重建二叉树
09、用两个栈实现队列
10-1、斐波那契数列

<!-- more -->

### 03、重复数字
- 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
```go
//通过map key唯一来操作
func findRepeatNumber(nums []int) int {
	m := make(map[int]int)
	for i := range nums {
		i2, ok := m[nums[i]]
		if ok {
			return i2
		}
		m[nums[i]] = nums[i]
	}
	return 0
}
```

### 04、二维数组中的查找
- 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```go
//这题直接循环了
func findNumberIn2DArray(matrix [][]int, target int) bool {
	for _, ints := range matrix {
		for _, i := range ints {
			if i == target {
				return true
			}
		}
	}
	return false
}
```
看题解时学习到`sort`包里面的方法
```go
i:=sort.SearchInts(nums,target) //查找target在nums中的下标
```
### 06、从尾到头打印链表
- 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reversePrint(head *ListNode) []int {
    var s []int
	for head!=nil {
		s = append(s, head.Val)
		head = head.Next
	}
	//逆序切片s
	for i := 0; i < len(s)/2; i++ {
		tmp := s[i]
		s[i] = s[len(s)-1-i]
		s[len(s)-1-i] = tmp
	}
	return s
}
```

### 07、重建二叉树
- 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func buildTree(preorder []int, inorder []int) *TreeNode {
	if len(preorder)==0 {
		return nil
	}
    //前序遍历第一个为根节点
	root := &TreeNode{
		Val: preorder[0],
	}
	var index int
    //找中序遍历中根节点的位置 左边为左子树 右边右子树
	for i := range inorder {
		if preorder[0] == inorder[i] {
			index = i
			break
		}
	}
    //根据根节点位置 递归就完事了
	root.Left = buildTree(preorder[1:index+1],inorder[:index])
	root.Right = buildTree(preorder[index+1:],inorder[index+1:])
	return root
}
```

### 09、用两个栈实现队列
- 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

```go
type CQueue struct {
	in  []int
	out []int
}

func Constructor() CQueue {
	return CQueue{}
}

func (this *CQueue) AppendTail(value int) {
    //往in切片后面append
	this.in = append(this.in, value)
}

func (this *CQueue) DeleteHead() int {
	if len(this.out) == 0 && len(this.in) == 0 {
		return -1
	}
    //将in逆序到out中
	if len(this.out) == 0 {
		for len(this.in) > 0 {
			lastIndex := len(this.in) - 1
			this.out = append(this.out, this.in[lastIndex])
			this.in = this.in[:lastIndex]
		}
	}
    //取out切片的最后一位
	lastIndex := len(this.out) - 1
	popVal := this.out[lastIndex]
	this.out = this.out[:lastIndex]
	return popVal
}

/**
 * Your CQueue object will be instantiated and called as such:
 * obj := Constructor();
 * obj.AppendTail(value);
 * param_2 := obj.DeleteHead();
 */
```

### 斐波那契数列
- 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：
  ```
  F(0) = 0,   F(1) = 1
  F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
  ```
  斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
  
  答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

```go
//刚开始没动脑子 直接递归 果断超时了
// 时间复杂度（O(2^n)）
//func fib(n int) int {
//	if n == 0 || n == 1 {
//		return n
//	}
//	
//	return fib(n-1) + fib(n-2)
//}

// 时间复杂度（O(n)）了  快很多 
func fib(n int) int {
	a := 0
	b := 1
	for i := 0; i < n; i++ {
		sum := (a + b) % 1000000007
		a = b
		b = sum
	}
	return a
}
```

*题解不一定最优，主要回忆下语法*