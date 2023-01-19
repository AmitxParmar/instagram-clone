import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import UploadPostDetails from "../components/UploadPostDetails";
import UploadPostImage from "../components/UploadPostImage";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";
import userNewPost from "../services/userNewPost";

export default function Upload({ setCurrentPage }) {
    const { user } = useAuth();
    const { userProfile, dataLoading } = useUserProfile(user.uid);
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [emoji, setEmoji] = useState(false);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);
    const [showUploadAlert, setShowUploadAlert] = useState(false);

    useEffect(() => {
        setCurrentPage("upload");
    }, []);

    const isInvalid = image === null || caption === "";

    const uploadPost = async (imgUrl) => {
        try {
            await userNewPost(
                user.uid,
                userProfile.username,
                userProfile.fullName,
                userProfile.profilePhotoUrl,
                caption,
                imgUrl,
                Date.now() + Math.ceil(Math.random() * 10000)
            );
            setUploading(false);
            setShowUploadAlert(true);

            setImage(null);
            setCaption("");

            setTimeout(() => {
                setShowUploadAlert(false);
            }, 2000);

            navigate(`/p/${user.uid}`);
        } catch (err) {
            setUploading(false);
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let form = new FormData();
        form.set("key", import.meta.env.VITE_IMGBBKEY);
        form.append("image", file);
        form.append("name", `${userProfile.username}'s Upload - ${file.name}`);
        setUploading(true);
        try {
            const res = await axios({
                method: "post",
                url: "https://api.imgbb.com/1/upload",
                data: form,
            });
            uploadPost(res.data.data.display_url);
        } catch (err) {
            setUploading(false);
            console.log(err);
        }
    };

    const handleClickEvent = (e) => {
        if (
            e.target.getAttribute("name") !== "face" &&
            emoji &&
            !e.target.classList.contains("epr-btn") &&
            !e.target.classList.contains("epr-emoji-img")
        )
            setEmoji((e) => !e);
    };

    const handleImage = async (e) => {
        let file = e.target.files[0];
        setFile(file);
        let fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            setImage(fileURL);
        };
    };

    return (
        <div
            className="container px-1 w-full md:w-3/4 mx-auto mt-8"
            style={{ maxWidth: "850px" }}
            onClick={handleClickEvent}
        >
            <form
                className="block lg:grid relative grid-cols-2 border border-gray-primary bg-white"
                onSubmit={handleSubmit}
            >
                <UploadPostImage
                    image={image}
                    handleImage={handleImage}
                    setImage={setImage}
                />
                <UploadPostDetails
                    isInvalid={isInvalid}
                    caption={caption}
                    setCaption={setCaption}
                    emoji={emoji}
                    setEmoji={setEmoji}
                    loading={loading}
                    userProfile={userProfile}
                />
                {uploading && (
                    <div className="absolute flex justify-center items-center top-0 left-0 h-full w-full bg-black-light/50 text-white">
                        <Loader className="w-24 h-24" />
                    </div>
                )}
                {showUploadAlert && (
                    <div className="comment__submit__alert fixed top-24 left-2/4 -translate-x-1/2 z-10">
                        <span className="font-bold py-1 px-5 bg-gray-background shadow-md rounded">
                            Post uploaded sucessfully.
                        </span>
                    </div>
                )}
            </form>
            <Footer justifyCenter="justify-center" textCenter="text-center" />
        </div>
    );
}