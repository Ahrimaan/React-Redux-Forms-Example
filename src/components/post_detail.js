import React, { Component } from 'react';
import { fetchPost, deletePost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
    componentDidMount() {
        if (!this.props.post) {
            let postid = this.props.match.params.id
            this.props.fetchPost(postid);
        }
    }

    onDeleteClick() {
        let postid = this.props.match.params.id
        this.props.deletePost(postid, () => {
            this.props.history.push('/');
        });
    }

    render() {
        let { post } = this.props;

        if (!post) {
            return <div>Loading....</div>;
        }

        return (
            <div>
                <Link to='/' className="btn btn-primary" >Back </Link>
                <button
                    className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)} >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}
// ownProps are all props of this Component
function mapStateToProps({ posts }, ownProps) {
    return {
        post: posts[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDetail);