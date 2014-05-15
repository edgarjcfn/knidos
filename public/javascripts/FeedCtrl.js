function FeedCtrl($scope)
{
	$scope.posts = [
		{description: 'Isso eh revoltante',
		 link:'https://i.imgur.com/9fXIbBz.jpg',
		 karma:100},
		{description: 'Isso aconteceu',
		 link:'https://www.youtube.com/watch?v=Kd9QO-Ktix0',
		 karma:1000}
	];


	$scope.voteUp = function(post)
	{
		post.karma += 1;
		$scope.save();
		$scope.sort();
	};

	$scope.voteDown = function(post)
	{
		post.karma -= 1;
		$scope.save();
		$scope.sort();
	};
}