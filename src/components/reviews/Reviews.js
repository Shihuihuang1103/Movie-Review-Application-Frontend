import React from 'react'
import api from '../../api/axiosConfig';
import {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewform/ReviewForm';



const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
            getMovieData(movieId);
    }, [movieId]);

    const addReview = async (e) =>{
        e.preventDefault();
        const rev = revText.current;
        try{
            const response = await api.post("/api/v1/reviews", {reviewBody: rev.value, imdbId:movieId});
            const updateReviews = [...reviews, {body:rev.value}];
            rev.value = "";
            setReviews(updateReviews);
            console.log(body);
        } catch(err)
        {
            console.error(err);
        }
    }
    console.log(movie?.poster)
    console.log(reviews)
  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
            
                <img src = {movie?.poster} alt="" />
            
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText = {revText} labelText = "Please write your review here:" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews && reviews.map((r)=>{
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews